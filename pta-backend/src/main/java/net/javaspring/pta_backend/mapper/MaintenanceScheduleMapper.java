package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.MaintenanceScheduleDTO;
import net.javaspring.pta_backend.entity.MaintenanceSchedule;
import net.javaspring.pta_backend.entity.MaintenanceStatus;
import net.javaspring.pta_backend.entity.Plant;
import net.javaspring.pta_backend.entity.User;
import net.javaspring.pta_backend.repository.PlantRepository;
import net.javaspring.pta_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MaintenanceScheduleMapper {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PlantRepository plantRepository;

    public MaintenanceScheduleDTO toDTO(MaintenanceSchedule schedule) {
        if (schedule == null) return null;
        
        MaintenanceScheduleDTO dto = new MaintenanceScheduleDTO();
        dto.setId(schedule.getId());
        dto.setUserId(schedule.getUser().getId());
        dto.setPlantId(schedule.getPlant().getId());
        dto.setScheduleDate(schedule.getScheduleDate());
        dto.setStatus(schedule.getStatus().name());
        return dto;
    }

    public MaintenanceSchedule toEntity(MaintenanceScheduleDTO dto) {
        if (dto == null) return null;
        
        MaintenanceSchedule schedule = new MaintenanceSchedule();
        schedule.setId(dto.getId());
        
        // Set user
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        schedule.setUser(user);
        
        // Set plant
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found with id: " + dto.getPlantId()));
        schedule.setPlant(plant);
        
        schedule.setScheduleDate(dto.getScheduleDate());
        schedule.setStatus(MaintenanceStatus.valueOf(dto.getStatus()));
        return schedule;
    }
} 