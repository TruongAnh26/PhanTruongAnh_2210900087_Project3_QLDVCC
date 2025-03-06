package net.javaspring.pta_backend.service;

import net.javaspring.pta_backend.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO getOrderById(Long id);
    List<OrderDTO> getOrdersByUserId(Long userId);
    List<OrderDTO> getAllOrders();
    OrderDTO updateOrderStatus(Long id, String status);
    void deleteOrder(Long id);
} 