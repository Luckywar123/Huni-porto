package id.huni.api;

import id.huni.api.Models.*;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

/** Semua endpoint /api/admin/** hanya untuk role admin (lihat SecurityConfig). */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProfileRepo profiles; private final PropertyRepo props; private final RoomRepo rooms;
    private final FieldRepo fields; private final BookingRepo bookings; private final StorageService storage;

    public AdminController(ProfileRepo profiles, PropertyRepo props, RoomRepo rooms, FieldRepo fields, BookingRepo bookings, StorageService storage) {
        this.profiles = profiles; this.props = props; this.rooms = rooms; this.fields = fields; this.bookings = bookings; this.storage = storage;
    }

    private static ResponseStatusException notFound() { return new ResponseStatusException(HttpStatus.NOT_FOUND, "Data tidak ditemukan"); }

    // ---- ringkasan dashboard ----
    @GetMapping("/stats")
    public Map<String, Object> stats() {
        var m = new LinkedHashMap<String, Object>();
        m.put("users", profiles.count());
        m.put("rooms", rooms.count());
        m.put("roomsAvailable", rooms.countByStatus("available"));
        m.put("roomsOccupied", rooms.countByStatus("occupied"));
        m.put("bookingsPending", bookings.countByStatus("pending"));
        m.put("bookingsPaid", bookings.countByStatus("paid"));
        m.put("futsalRevenue", bookings.paidRevenue());
        return m;
    }

    // ---- properti ----
    @PostMapping("/properties")
    public Property addProperty(@RequestBody Property p) { p.id = null; return props.save(p); }

    @PutMapping("/properties/{id}")
    public Property updateProperty(@PathVariable UUID id, @RequestBody Property p) { p.id = id; return props.save(p); }

    @DeleteMapping("/properties/{id}")
    public void deleteProperty(@PathVariable UUID id) { props.deleteById(id); }

    // ---- kamar ----
    @PostMapping("/rooms")
    public Room addRoom(@RequestBody Room r) { r.id = null; return rooms.save(r); }

    @PutMapping("/rooms/{id}")
    public Room updateRoom(@PathVariable UUID id, @RequestBody Room in) {
        var r = rooms.findById(id).orElseThrow(AdminController::notFound);
        r.propertyId = in.propertyId; r.name = in.name; r.priceMonthly = in.priceMonthly; r.status = in.status;
        return rooms.save(r);
    }

    @DeleteMapping("/rooms/{id}")
    public void deleteRoom(@PathVariable UUID id) { rooms.deleteById(id); }

    @PostMapping("/rooms/{id}/photos")
    public Room addPhoto(@PathVariable UUID id, @RequestParam MultipartFile file) throws IOException {
        var r = rooms.findById(id).orElseThrow(AdminController::notFound);
        r.photos.add(storage.upload("room-photos", id.toString(), file));
        return rooms.save(r);
    }

    @DeleteMapping("/rooms/{id}/photos")
    public Room removePhoto(@PathVariable UUID id, @RequestParam String url) {
        var r = rooms.findById(id).orElseThrow(AdminController::notFound);
        r.photos.remove(url);
        return rooms.save(r);
    }

    // ---- lapangan futsal ----
    @PostMapping("/futsal/fields")
    public FutsalField addField(@RequestBody FutsalField f) { f.id = null; return fields.save(f); }

    @PutMapping("/futsal/fields/{id}")
    public FutsalField updateField(@PathVariable UUID id, @RequestBody FutsalField f) { f.id = id; return fields.save(f); }

    @DeleteMapping("/futsal/fields/{id}")
    public void deleteField(@PathVariable UUID id) { fields.deleteById(id); }

    // ---- booking futsal ----
    @GetMapping("/futsal/bookings")
    public List<FutsalBooking> allBookings() { return bookings.findAll(Sort.by(Sort.Direction.DESC, "startTime")); }

    public record StatusIn(String status) {}

    @PatchMapping("/futsal/bookings/{id}/status")
    public FutsalBooking setStatus(@PathVariable UUID id, @RequestBody StatusIn in) {
        if (!Set.of("pending", "paid", "cancelled").contains(in.status()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Status tidak valid");
        var b = bookings.findById(id).orElseThrow(AdminController::notFound);
        b.status = in.status();
        return bookings.save(b);
    }

    // ---- pengguna ----
    @GetMapping("/users")
    public List<Profile> users() { return profiles.findAll(); }

    public record RoleIn(String role) {}

    @PatchMapping("/users/{id}/role")
    public Profile setRole(@PathVariable UUID id, @RequestBody RoleIn in) {
        if (!Set.of("user", "admin").contains(in.role()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role tidak valid");
        var p = profiles.findById(id).orElseThrow(AdminController::notFound);
        p.role = in.role();
        return profiles.save(p);
    }
}
