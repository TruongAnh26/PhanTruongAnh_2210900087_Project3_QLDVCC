package net.javaspring.pta_backend.dto;

import lombok.Data;

@Data
public class SuggestionDTO {
    private Long id;
    private Long plantId;
    private String light;
    private String spaceType;
    private String airQuality;
    private String humidity;
} 