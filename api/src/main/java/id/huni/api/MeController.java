package id.huni.api;

import id.huni.api.Models.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/me")
public class MeController {
    private final ProfileRepo profiles; private final FieldRepo fields; private final BookingRepo bookings; private final StorageService storage;

    public MeController(ProfileRepo profiles, FieldRepo fields, BookingRepo bookings, StorageService storage) {
        this.profiles = profiles; this.fields = fields; this.bookings = bookings; this.storage = storage;
    }

    private Profile current(Authentication a) {
        return profiles.findById(UUID.fromString(a.getName()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profil tidak ditemukan"));
    }

    @GetMapping
    public Profile me(Authentication a) { return current(a); }

    public record ProfileIn(String fullName, String phone) {}

    @PutMapping
    public Profile update(Authentication a, @RequestBody ProfileIn in) {
        var p = current(a);
        p.fullName = in.fullName();
        p.phone = in.phone();
        return profiles.save(p);
    }

    @PostMapping("/avatar")
    public Profile avatar(Authentication a, @RequestParam MultipartFile file) throws IOException {
        var p = current(a);
        p.avatarUrl = storage.upload("avatars", p.id.toString(), file);
        return profiles.save(p);
    }

    @GetMapping("/bookings")
    public List<FutsalBooking> mine(Authentication a) { return bookings.findByUserIdOrderByStartTimeDesc(current(a).id); }

    public record BookingIn(UUID fieldId, OffsetDateTime start, OffsetDateTime end) {}

    @PostMapping("/bookings")
    public FutsalBooking book(Authentication a, @RequestBody BookingIn in) {
        if (in.start() == null || in.end() == null || !in.end().isAfter(in.start()) || in.start().isBefore(OffsetDateTime.now()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Waktu booking tidak valid");
        var field = fields.findById(in.fieldId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lapangan tidak ditemukan"));
        var p = current(a);
        var b = new FutsalBooking();
        b.fieldId = field.id; b.userId = p.id; b.customerName = p.fullName; b.phone = p.phone;
        b.startTime = in.start(); b.endTime = in.end();
        long minutes = Duration.between(in.start(), in.end()).toMinutes();
        b.totalPrice = field.pricePerHour.multiply(BigDecimal.valueOf(minutes)).divide(BigDecimal.valueOf(60), 2, RoundingMode.HALF_UP);
        try {
            return bookings.saveAndFlush(b);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Slot sudah dibooking orang lain");
        }
    }
}
