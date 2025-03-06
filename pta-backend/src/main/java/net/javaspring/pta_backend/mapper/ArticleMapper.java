package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.ArticleDTO;
import net.javaspring.pta_backend.entity.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {
    
    public ArticleDTO toDTO(Article article) {
        if (article == null) return null;
        
        ArticleDTO dto = new ArticleDTO();
        dto.setId(article.getId());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setImageUrl(article.getImageUrl());
        dto.setCreatedAt(article.getCreatedAt());
        return dto;
    }

    public Article toEntity(ArticleDTO dto) {
        if (dto == null) return null;
        
        Article article = new Article();
        article.setId(dto.getId());
        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setImageUrl(dto.getImageUrl());
        return article;
    }
} 