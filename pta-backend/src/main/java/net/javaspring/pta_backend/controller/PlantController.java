package net.javaspring.pta_backend.controller;

import net.javaspring.pta_backend.dto.PlantDTO;
import net.javaspring.pta_backend.exception.PlantDeletionException;
import net.javaspring.pta_backend.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PlantController {

    @Autowired
    private PlantService plantService;

    @GetMapping
    public ResponseEntity<List<PlantDTO>> getAllPlants() {
        return ResponseEntity.ok(plantService.getAllPlants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlantDTO> getPlantById(@PathVariable Long id) {
        PlantDTO plant = plantService.getPlantById(id);
        return plant != null ? ResponseEntity.ok(plant) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PlantDTO> createPlant(@RequestBody PlantDTO plantDTO) {
        return ResponseEntity.ok(plantService.createPlant(plantDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlantDTO> updatePlant(@PathVariable Long id, @RequestBody PlantDTO plantDTO) {
        PlantDTO updatedPlant = plantService.updatePlant(id, plantDTO);
        return updatedPlant != null ? ResponseEntity.ok(updatedPlant) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlant(@PathVariable Long id) {
        try {
            plantService.deletePlant(id);
            return ResponseEntity.ok().build();
        } catch (PlantDeletionException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "An unexpected error occurred while deleting the plant"));
        }
    }
} 