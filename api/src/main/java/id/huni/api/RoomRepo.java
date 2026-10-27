package id.huni.api;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Models.Room, UUID> {
    List<Models.Room> findByStatus(String status);
    List<Models.Room> findByPropertyId(UUID propertyId);
    long countByStatus(String status);
}
