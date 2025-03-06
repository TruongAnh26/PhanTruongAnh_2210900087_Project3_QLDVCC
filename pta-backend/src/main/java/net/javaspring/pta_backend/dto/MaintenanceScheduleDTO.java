package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MaintenanceScheduleDTO {
    private Long id;
    private Long userId;
    private Long plantId;
    private LocalDate scheduleDate;
    private String status;
} 