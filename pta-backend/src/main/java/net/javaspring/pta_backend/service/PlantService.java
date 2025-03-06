package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.PlantDTO;

import java.util.List;

public interface PlantService {
    PlantDTO createPlant(PlantDTO plantDTO);
    PlantDTO getPlantById(Long id);
    List<PlantDTO> getAllPlants();
    PlantDTO updatePlant(Long id, PlantDTO plantDTO);
    void deletePlant(Long id);
} 