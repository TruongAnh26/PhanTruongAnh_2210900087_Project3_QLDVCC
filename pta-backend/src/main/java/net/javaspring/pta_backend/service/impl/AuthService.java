package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.AuthResponseDTO;
import net.javaspring.pta_backend.dto.LoginDTO;
import net.javaspring.pta_backend.dto.RegisterDTO;
import net.javaspring.pta_backend.entity.User;
import net.javaspring.pta_backend.entity.UserRole;
import net.javaspring.pta_backend.repository.UserRepository;
import net.javaspring.pta_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public AuthResponseDTO register(RegisterDTO registerDTO) {
        if (userRepository.existsByEmail(registerDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(registerDTO.getName());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        user.setRole(UserRole.customer);

        user = userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return createAuthResponse(user, token);
    }

    public AuthResponseDTO login(LoginDTO loginDTO) {
        User user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return createAuthResponse(user, token);
    }

    private AuthResponseDTO createAuthResponse(User user, String token) {
        AuthResponseDTO response = new AuthResponseDTO();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().name());
        response.setToken(token);
        return response;
    }
} 