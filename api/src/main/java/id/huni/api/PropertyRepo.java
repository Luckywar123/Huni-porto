package id.huni.api;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepo extends JpaRepository<Models.Property, UUID> {}
