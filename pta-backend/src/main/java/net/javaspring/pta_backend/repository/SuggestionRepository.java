package net.javaspring.pta_backend.repository;

import net.javaspring.pta_backend.entity.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
    List<Suggestion> findByPlantId(Long plantId);
} 