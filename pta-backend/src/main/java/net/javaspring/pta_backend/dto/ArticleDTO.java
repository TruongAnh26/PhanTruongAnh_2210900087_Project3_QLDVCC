package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ArticleDTO {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
} 