package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.SuggestionDTO;
import net.javaspring.pta_backend.entity.Suggestion;
import net.javaspring.pta_backend.mapper.SuggestionMapper;
import net.javaspring.pta_backend.repository.SuggestionRepository;
import net.javaspring.pta_backend.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuggestionServiceImpl implements SuggestionService {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private SuggestionMapper suggestionMapper;

    @Override
    @Transactional
    public SuggestionDTO createSuggestion(SuggestionDTO suggestionDTO) {
        Suggestion suggestion = suggestionMapper.toEntity(suggestionDTO);
        suggestion = suggestionRepository.save(suggestion);
        return suggestionMapper.toDTO(suggestion);
    }

    @Override
    public SuggestionDTO getSuggestionById(Long id) {
        return suggestionRepository.findById(id)
                .map(suggestionMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<SuggestionDTO> getSuggestionsByPlantId(Long plantId) {
        return suggestionRepository.findByPlantId(plantId).stream()
                .map(suggestionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SuggestionDTO> getAllSuggestions() {
        return suggestionRepository.findAll().stream()
                .map(suggestionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SuggestionDTO updateSuggestion(Long id, SuggestionDTO suggestionDTO) {
        return suggestionRepository.findById(id)
                .map(existingSuggestion -> {
                    Suggestion updatedSuggestion = suggestionMapper.toEntity(suggestionDTO);
                    updatedSuggestion.setId(id);
                    updatedSuggestion = suggestionRepository.save(updatedSuggestion);
                    return suggestionMapper.toDTO(updatedSuggestion);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void deleteSuggestion(Long id) {
        suggestionRepository.deleteById(id);
    }
} 