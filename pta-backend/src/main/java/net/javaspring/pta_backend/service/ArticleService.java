package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.ArticleDTO;

import java.util.List;

public interface ArticleService {
    ArticleDTO createArticle(ArticleDTO articleDTO);
    ArticleDTO getArticleById(Long id);
    List<ArticleDTO> getAllArticles();
    List<ArticleDTO> searchArticles(String keyword);
    ArticleDTO updateArticle(Long id, ArticleDTO articleDTO);
    void deleteArticle(Long id);
} 