package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.MaintenanceScheduleDTO;

import java.time.LocalDate;
import java.util.List;

public interface MaintenanceScheduleService {
    MaintenanceScheduleDTO createSchedule(MaintenanceScheduleDTO scheduleDTO);
    MaintenanceScheduleDTO getScheduleById(Long id);
    List<MaintenanceScheduleDTO> getSchedulesByUserId(Long userId);
    List<MaintenanceScheduleDTO> getSchedulesByPlantId(Long plantId);
    List<MaintenanceScheduleDTO> getSchedulesByDateRange(LocalDate startDate, LocalDate endDate);
    List<MaintenanceScheduleDTO> getAllSchedules();
    MaintenanceScheduleDTO updateScheduleStatus(Long id, String status);
    void deleteSchedule(Long id);
} 