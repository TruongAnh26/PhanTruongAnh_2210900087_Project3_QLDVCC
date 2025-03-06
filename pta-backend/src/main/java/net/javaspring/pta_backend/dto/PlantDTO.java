package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PlantDTO {
    private Long id;
    private String name;
    private String description;
    private String careGuide;
    private BigDecimal price;
    private String imageUrl;
    private String category;
    private LocalDateTime createdAt;
} 