package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);
    UserDTO getUserByEmail(String email);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
} 