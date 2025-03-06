package net.javaspring.pta_backend.dto;

import lombok.Data;

@Data
public class AuthResponseDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String token;
}
