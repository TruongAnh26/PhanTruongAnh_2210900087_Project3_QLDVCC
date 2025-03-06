package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 