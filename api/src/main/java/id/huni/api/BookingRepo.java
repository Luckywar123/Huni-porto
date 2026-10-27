package id.huni.api;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepo extends JpaRepository<Models.FutsalBooking, UUID> {
    List<Models.FutsalBooking> findByFieldIdAndStartTimeBetweenAndStatusNot(UUID fieldId, OffsetDateTime from, OffsetDateTime to, String status);
    List<Models.FutsalBooking> findByUserIdOrderByStartTimeDesc(UUID userId);
    long countByStatus(String status);

    @Query("select coalesce(sum(b.totalPrice), 0) from FutsalBooking b where b.status = 'paid'")
    BigDecimal paidRevenue();
}
