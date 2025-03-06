package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.UserDTO;
import net.javaspring.pta_backend.entity.User;
import net.javaspring.pta_backend.entity.UserRole;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    
    public UserDTO toDTO(User user) {
        if (user == null) return null;
        
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole().name());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) return null;
        
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setRole(UserRole.valueOf(dto.getRole()));
        user.setCreatedAt(dto.getCreatedAt());
        user.setUpdatedAt(dto.getUpdatedAt());
        return user;
    }
} 