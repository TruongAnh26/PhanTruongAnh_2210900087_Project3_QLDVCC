package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.SuggestionDTO;

import java.util.List;

public interface SuggestionService {
    SuggestionDTO createSuggestion(SuggestionDTO suggestionDTO);
    SuggestionDTO getSuggestionById(Long id);
    List<SuggestionDTO> getSuggestionsByPlantId(Long plantId);
    List<SuggestionDTO> getAllSuggestions();
    SuggestionDTO updateSuggestion(Long id, SuggestionDTO suggestionDTO);
    void deleteSuggestion(Long id);
} 