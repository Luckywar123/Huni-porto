package id.huni.api;

import id.huni.api.Models.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    private static final ZoneId WIB = ZoneId.of("Asia/Jakarta");
    private final PropertyRepo props; private final RoomRepo rooms; private final FieldRepo fields; private final BookingRepo bookings;

    public PublicController(PropertyRepo props, RoomRepo rooms, FieldRepo fields, BookingRepo bookings) {
        this.props = props; this.rooms = rooms; this.fields = fields; this.bookings = bookings;
    }

    @GetMapping("/properties")
    public List<Property> properties() { return props.findAll(); }

    @GetMapping("/rooms")
    public List<Room> rooms(@RequestParam(required = false) UUID propertyId) {
        return propertyId == null ? rooms.findByStatus("available") : rooms.findByPropertyId(propertyId);
    }

    @GetMapping("/futsal/fields")
    public List<FutsalField> fields() { return fields.findAll(); }

    /** Slot yang sudah terisi di tanggal tertentu (tanpa data pemesan). */
    @GetMapping("/futsal/fields/{id}/busy")
    public List<Map<String, Object>> busy(@PathVariable UUID id, @RequestParam LocalDate date) {
        var from = date.atStartOfDay(WIB).toOffsetDateTime();
        return bookings.findByFieldIdAndStartTimeBetweenAndStatusNot(id, from, from.plusDays(1), "cancelled").stream()
            .map(b -> Map.<String, Object>of("start", b.startTime, "end", b.endTime)).toList();
    }
}
