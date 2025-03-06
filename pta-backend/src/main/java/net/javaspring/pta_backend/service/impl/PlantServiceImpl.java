package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.PlantDTO;
import net.javaspring.pta_backend.entity.Plant;
import net.javaspring.pta_backend.exception.PlantDeletionException;
import net.javaspring.pta_backend.mapper.PlantMapper;
import net.javaspring.pta_backend.repository.PlantRepository;
import net.javaspring.pta_backend.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlantServiceImpl implements PlantService {

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantMapper plantMapper;

    @Override
    @Transactional
    public PlantDTO createPlant(PlantDTO plantDTO) {
        Plant plant = plantMapper.toEntity(plantDTO);
        plant = plantRepository.save(plant);
        return plantMapper.toDTO(plant);
    }

    @Override
    public PlantDTO getPlantById(Long id) {
        return plantRepository.findById(id)
                .map(plantMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<PlantDTO> getAllPlants() {
        return plantRepository.findAll().stream()
                .map(plantMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PlantDTO updatePlant(Long id, PlantDTO plantDTO) {
        return plantRepository.findById(id)
                .map(existingPlant -> {
                    Plant updatedPlant = plantMapper.toEntity(plantDTO);
                    updatedPlant.setId(id);
                    updatedPlant = plantRepository.save(updatedPlant);
                    return plantMapper.toDTO(updatedPlant);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void deletePlant(Long id) {
        Plant plant = plantRepository.findById(id)
                .orElseThrow(() -> new PlantDeletionException("Plant not found with id: " + id));
        
        try {
            plantRepository.delete(plant);
        } catch (DataIntegrityViolationException e) {
            throw new PlantDeletionException("Cannot delete plant. It is currently referenced in maintenance schedules or other records. Please delete those records first.");
        } catch (Exception e) {
            throw new PlantDeletionException("An error occurred while deleting the plant: " + e.getMessage());
        }
    }
} 