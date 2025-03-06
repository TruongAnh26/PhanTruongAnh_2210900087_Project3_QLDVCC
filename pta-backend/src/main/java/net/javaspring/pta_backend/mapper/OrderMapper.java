package net.javaspring.pta_backend.mapper;

import net.javaspring.pta_backend.dto.OrderDTO;
import net.javaspring.pta_backend.dto.OrderDetailDTO;
import net.javaspring.pta_backend.entity.*;
import net.javaspring.pta_backend.repository.PlantRepository;
import net.javaspring.pta_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PlantRepository plantRepository;

    public OrderDTO toDTO(Order order) {
        if (order == null) return null;
        
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setStatus(order.getStatus().name());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setCreatedAt(order.getCreatedAt());
        
        if (order.getOrderDetails() != null) {
            List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream()
                    .map(this::toDetailDTO)
                    .collect(Collectors.toList());
            dto.setOrderDetails(detailDTOs);
        }
        
        return dto;
    }

    public Order toEntity(OrderDTO dto) {
        if (dto == null) return null;
        
        Order order = new Order();
        order.setId(dto.getId());
        
        // Set user
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));
        order.setUser(user);
        
        order.setStatus(OrderStatus.valueOf(dto.getStatus()));
        order.setTotalPrice(dto.getTotalPrice());
        
        if (dto.getOrderDetails() != null) {
            List<OrderDetail> details = dto.getOrderDetails().stream()
                    .map(detailDTO -> toDetailEntity(detailDTO, order))
                    .collect(Collectors.toList());
            order.setOrderDetails(details);
        }
        
        return order;
    }

    private OrderDetailDTO toDetailDTO(OrderDetail detail) {
        if (detail == null) return null;
        
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(detail.getId());
        dto.setOrderId(detail.getOrder().getId());
        dto.setPlantId(detail.getPlant().getId());
        dto.setQuantity(detail.getQuantity());
        dto.setPrice(detail.getPrice());
        return dto;
    }

    private OrderDetail toDetailEntity(OrderDetailDTO dto, Order order) {
        if (dto == null) return null;
        
        OrderDetail detail = new OrderDetail();
        detail.setId(dto.getId());
        detail.setOrder(order);
        
        // Set plant
        Plant plant = plantRepository.findById(dto.getPlantId())
                .orElseThrow(() -> new RuntimeException("Plant not found with id: " + dto.getPlantId()));
        detail.setPlant(plant);
        
        detail.setQuantity(dto.getQuantity());
        detail.setPrice(dto.getPrice());
        return detail;
    }
} 