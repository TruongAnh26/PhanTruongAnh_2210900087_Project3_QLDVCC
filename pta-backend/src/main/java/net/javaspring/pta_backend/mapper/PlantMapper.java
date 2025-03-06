package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.PlantDTO;
import net.javaspring.pta_backend.entity.Plant;
import net.javaspring.pta_backend.entity.PlantCategory;
import org.springframework.stereotype.Component;

@Component
public class PlantMapper {
    
    public PlantDTO toDTO(Plant plant) {
        if (plant == null) return null;
        
        PlantDTO dto = new PlantDTO();
        dto.setId(plant.getId());
        dto.setName(plant.getName());
        dto.setDescription(plant.getDescription());
        dto.setCareGuide(plant.getCareGuide());
        dto.setPrice(plant.getPrice());
        dto.setImageUrl(plant.getImageUrl());
        dto.setCategory(plant.getCategory().name());
        dto.setCreatedAt(plant.getCreatedAt());
        return dto;
    }

    public Plant toEntity(PlantDTO dto) {
        if (dto == null) return null;
        
        Plant plant = new Plant();
        plant.setId(dto.getId());
        plant.setName(dto.getName());
        plant.setDescription(dto.getDescription());
        plant.setCareGuide(dto.getCareGuide());
        plant.setPrice(dto.getPrice());
        plant.setImageUrl(dto.getImageUrl());
        plant.setCategory(PlantCategory.valueOf(dto.getCategory()));
        plant.setCreatedAt(dto.getCreatedAt());
        return plant;
    }
} 