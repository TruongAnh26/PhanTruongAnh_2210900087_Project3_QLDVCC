package net.javaspring.pta_backend.controller;

import net.javaspring.pta_backend.dto.SuggestionDTO;
import net.javaspring.pta_backend.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suggestions")
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;

    @PostMapping
    public ResponseEntity<SuggestionDTO> createSuggestion(@RequestBody SuggestionDTO suggestionDTO) {
        return ResponseEntity.ok(suggestionService.createSuggestion(suggestionDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SuggestionDTO> getSuggestionById(@PathVariable Long id) {
        SuggestionDTO suggestion = suggestionService.getSuggestionById(id);
        return suggestion != null ? ResponseEntity.ok(suggestion) : ResponseEntity.notFound().build();
    }

    @GetMapping("/plant/{plantId}")
    public ResponseEntity<List<SuggestionDTO>> getSuggestionsByPlantId(@PathVariable Long plantId) {
        return ResponseEntity.ok(suggestionService.getSuggestionsByPlantId(plantId));
    }

    @GetMapping
    public ResponseEntity<List<SuggestionDTO>> getAllSuggestions() {
        return ResponseEntity.ok(suggestionService.getAllSuggestions());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SuggestionDTO> updateSuggestion(@PathVariable Long id, @RequestBody SuggestionDTO suggestionDTO) {
        SuggestionDTO updatedSuggestion = suggestionService.updateSuggestion(id, suggestionDTO);
        return updatedSuggestion != null ? ResponseEntity.ok(updatedSuggestion) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSuggestion(@PathVariable Long id) {
        suggestionService.deleteSuggestion(id);
        return ResponseEntity.ok().build();
    }
} 