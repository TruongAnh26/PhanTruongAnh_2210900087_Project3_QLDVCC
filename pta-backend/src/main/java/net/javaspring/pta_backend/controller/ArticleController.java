package net.javaspring.pta_backend.controller;

import net.javaspring.pta_backend.dto.ArticleDTO;
import net.javaspring.pta_backend.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping
    public ResponseEntity<ArticleDTO> createArticle(@RequestBody ArticleDTO articleDTO) {
        return ResponseEntity.ok(articleService.createArticle(articleDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable Long id) {
        ArticleDTO article = articleService.getArticleById(id);
        return article != null ? ResponseEntity.ok(article) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        return ResponseEntity.ok(articleService.getAllArticles());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ArticleDTO>> searchArticles(@RequestParam String keyword) {
        return ResponseEntity.ok(articleService.searchArticles(keyword));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleDTO> updateArticle(@PathVariable Long id, @RequestBody ArticleDTO articleDTO) {
        ArticleDTO updatedArticle = articleService.updateArticle(id, articleDTO);
        return updatedArticle != null ? ResponseEntity.ok(updatedArticle) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok().build();
    }
} 