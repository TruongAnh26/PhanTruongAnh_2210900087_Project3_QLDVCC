package net.javaspring.pta_backend.repository;

import net.javaspring.pta_backend.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
} 