package net.javaspring.pta_backend.repository;

import net.javaspring.pta_backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    @Query("SELECT a FROM Article a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(a.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Article> searchArticles(String keyword);
} 