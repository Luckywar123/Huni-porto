package id.huni.api;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/** Entity skeleton (field public biar ringkas). Tabel rentals & payments sudah ada di DB, entity menyusul. */
public class Models {

    @Entity(name = "Profile") @Table(name = "profiles")
    public static class Profile {
        @Id public UUID id;
        public String fullName;
        public String phone;
        public String avatarUrl;
        public String role = "user";
    }

    @Entity(name = "Property") @Table(name = "properties")
    public static class Property {
        @Id @GeneratedValue public UUID id;
        public String name;
        public String type;
        public String address;
    }

    @Entity(name = "Room") @Table(name = "rooms")
    public static class Room {
        @Id @GeneratedValue public UUID id;
        public UUID propertyId;
        public String name;
        public BigDecimal priceMonthly;
        public String status = "available";
        @JdbcTypeCode(SqlTypes.ARRAY) @Column(columnDefinition = "text[]")
        public List<String> photos = new ArrayList<>();
    }

    @Entity(name = "FutsalField") @Table(name = "futsal_fields")
    public static class FutsalField {
        @Id @GeneratedValue public UUID id;
        public String name;
        public BigDecimal pricePerHour;
    }

    @Entity(name = "FutsalBooking") @Table(name = "futsal_bookings")
    public static class FutsalBooking {
        @Id @GeneratedValue public UUID id;
        public UUID fieldId;
        public UUID userId;
        public String customerName;
        public String phone;
        public OffsetDateTime startTime;
        public OffsetDateTime endTime;
        public BigDecimal totalPrice = BigDecimal.ZERO;
        public String status = "pending";
    }
}
