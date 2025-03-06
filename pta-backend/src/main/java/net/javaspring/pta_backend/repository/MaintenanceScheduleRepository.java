package net.javaspring.pta_backend.repository;

import net.javaspring.pta_backend.entity.MaintenanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MaintenanceScheduleRepository extends JpaRepository<MaintenanceSchedule, Long> {
    List<MaintenanceSchedule> findByUserId(Long userId);
    List<MaintenanceSchedule> findByPlantId(Long plantId);
    List<MaintenanceSchedule> findByScheduleDateBetween(LocalDate startDate, LocalDate endDate);
} 