package net.javaspring.pta_backend.controller;

import net.javaspring.pta_backend.dto.MaintenanceScheduleDTO;
import net.javaspring.pta_backend.service.MaintenanceScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/maintenance-schedules")
public class MaintenanceScheduleController {

    @Autowired
    private MaintenanceScheduleService maintenanceScheduleService;

    @PostMapping
    public ResponseEntity<MaintenanceScheduleDTO> createSchedule(@RequestBody MaintenanceScheduleDTO scheduleDTO) {
        return ResponseEntity.ok(maintenanceScheduleService.createSchedule(scheduleDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceScheduleDTO> getScheduleById(@PathVariable Long id) {
        MaintenanceScheduleDTO schedule = maintenanceScheduleService.getScheduleById(id);
        return schedule != null ? ResponseEntity.ok(schedule) : ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MaintenanceScheduleDTO>> getSchedulesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(maintenanceScheduleService.getSchedulesByUserId(userId));
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<MaintenanceScheduleDTO>> getSchedulesByPlantId(@PathVariable Long plantId) {
        return ResponseEntity.ok(maintenanceScheduleService.getSchedulesByPlantId(plantId));
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<MaintenanceScheduleDTO>> getSchedulesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(maintenanceScheduleService.getSchedulesByDateRange(startDate, endDate));
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceScheduleDTO>> getAllSchedules() {
        return ResponseEntity.ok(maintenanceScheduleService.getAllSchedules());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<MaintenanceScheduleDTO> updateScheduleStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        MaintenanceScheduleDTO updatedSchedule = maintenanceScheduleService.updateScheduleStatus(id, status);
        return updatedSchedule != null ? ResponseEntity.ok(updatedSchedule) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        maintenanceScheduleService.deleteSchedule(id);
        return ResponseEntity.ok().build();
    }
} 