package net.javaspring.pta_backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${server.port}")
    private String serverPort;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Please select a file to upload"));
        }

        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                logger.info("Created upload directory: {}", uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filePath = uploadPath.resolve(newFilename);
            Files.copy(file.getInputStream(), filePath);
            logger.info("File saved successfully: {}", filePath);

            // Return the full URL to access the file
            String fileUrl = String.format("http://localhost:%s/uploads/%s", serverPort, newFilename);
            return ResponseEntity.ok().body(Map.of("url", fileUrl));

        } catch (IOException e) {
            logger.error("Failed to upload file", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }
}