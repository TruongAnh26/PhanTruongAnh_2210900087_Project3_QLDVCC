package net.javaspring.pta_backend.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderDetailDTO {
    private Long id;
    private Long orderId;
    private Long plantId;
    private Integer quantity;
    private BigDecimal price;
} 