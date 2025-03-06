package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.ArticleDTO;
import net.javaspring.pta_backend.entity.Article;
import net.javaspring.pta_backend.mapper.ArticleMapper;
import net.javaspring.pta_backend.repository.ArticleRepository;
import net.javaspring.pta_backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    @Transactional
    public ArticleDTO createArticle(ArticleDTO articleDTO) {
        Article article = articleMapper.toEntity(articleDTO);
        article = articleRepository.save(article);
        return articleMapper.toDTO(article);
    }

    @Override
    public ArticleDTO getArticleById(Long id) {
        return articleRepository.findById(id)
                .map(articleMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(articleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ArticleDTO> searchArticles(String keyword) {
        return articleRepository.searchArticles(keyword).stream()
                .map(articleMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ArticleDTO updateArticle(Long id, ArticleDTO articleDTO) {
        return articleRepository.findById(id)
                .map(existingArticle -> {
                    Article updatedArticle = articleMapper.toEntity(articleDTO);
                    updatedArticle.setId(id);
                    updatedArticle = articleRepository.save(updatedArticle);
                    return articleMapper.toDTO(updatedArticle);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
} 