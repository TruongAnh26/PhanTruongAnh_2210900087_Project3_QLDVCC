package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private Long userId;
    private String status;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private List<OrderDetailDTO> orderDetails;
} 