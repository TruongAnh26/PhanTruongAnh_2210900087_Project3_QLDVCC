package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.MaintenanceScheduleDTO;
import net.javaspring.pta_backend.entity.MaintenanceSchedule;
import net.javaspring.pta_backend.entity.MaintenanceStatus;
import net.javaspring.pta_backend.mapper.MaintenanceScheduleMapper;
import net.javaspring.pta_backend.repository.MaintenanceScheduleRepository;
import net.javaspring.pta_backend.service.MaintenanceScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceScheduleServiceImpl implements MaintenanceScheduleService {

    @Autowired
    private MaintenanceScheduleRepository maintenanceScheduleRepository;

    @Autowired
    private MaintenanceScheduleMapper maintenanceScheduleMapper;

    @Override
    @Transactional
    public MaintenanceScheduleDTO createSchedule(MaintenanceScheduleDTO scheduleDTO) {
        MaintenanceSchedule schedule = maintenanceScheduleMapper.toEntity(scheduleDTO);
        schedule = maintenanceScheduleRepository.save(schedule);
        return maintenanceScheduleMapper.toDTO(schedule);
    }

    @Override
    public MaintenanceScheduleDTO getScheduleById(Long id) {
        return maintenanceScheduleRepository.findById(id)
                .map(maintenanceScheduleMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<MaintenanceScheduleDTO> getSchedulesByUserId(Long userId) {
        return maintenanceScheduleRepository.findByUserId(userId).stream()
                .map(maintenanceScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MaintenanceScheduleDTO> getSchedulesByPlantId(Long plantId) {
        return maintenanceScheduleRepository.findByPlantId(plantId).stream()
                .map(maintenanceScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MaintenanceScheduleDTO> getSchedulesByDateRange(LocalDate startDate, LocalDate endDate) {
        return maintenanceScheduleRepository.findByScheduleDateBetween(startDate, endDate).stream()
                .map(maintenanceScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MaintenanceScheduleDTO> getAllSchedules() {
        return maintenanceScheduleRepository.findAll().stream()
                .map(maintenanceScheduleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintenanceScheduleDTO updateScheduleStatus(Long id, String status) {
        return maintenanceScheduleRepository.findById(id)
                .map(schedule -> {
                    schedule.setStatus(MaintenanceStatus.valueOf(status));
                    schedule = maintenanceScheduleRepository.save(schedule);
                    return maintenanceScheduleMapper.toDTO(schedule);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void deleteSchedule(Long id) {
        maintenanceScheduleRepository.deleteById(id);
    }
} 