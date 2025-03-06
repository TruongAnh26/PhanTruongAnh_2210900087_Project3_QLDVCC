package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.SuggestionDTO;
import net.javaspring.pta_backend.entity.*;
import net.javaspring.pta_backend.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SuggestionMapper {
    
    @Autowired
    private PlantRepository plantRepository;

    public SuggestionDTO toDTO(Suggestion suggestion) {
        if (suggestion == null) return null;
        
        SuggestionDTO dto = new SuggestionDTO();
        dto.setId(suggestion.getId());
        dto.setPlantId(suggestion.getPlant().getId());
        dto.setLight(suggestion.getLight().name());
        dto.setSpaceType(suggestion.getSpaceType().name());
        dto.setAirQuality(suggestion.getAirQuality().name());
        dto.setHumidity(suggestion.getHumidity().name());
        return dto;
    }

    public Suggestion toEntity(SuggestionDTO dto) {
        if (dto == null) return null;
        
        Suggestion suggestion = new Suggestion();
        suggestion.setId(dto.getId());
        
        // Set plant
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found with id: " + dto.getPlantId()));
        suggestion.setPlant(plant);
        
        suggestion.setLight(LightLevel.valueOf(dto.getLight()));
        suggestion.setSpaceType(SpaceType.valueOf(dto.getSpaceType()));
        suggestion.setAirQuality(AirQuality.valueOf(dto.getAirQuality()));
        suggestion.setHumidity(Humidity.valueOf(dto.getHumidity()));
        
        return suggestion;
    }
} 