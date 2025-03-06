package net.javaspring.pta_backend.service.impl;

import net.javaspring.pta_backend.dto.OrderDTO;
import net.javaspring.pta_backend.entity.Order;
import net.javaspring.pta_backend.entity.OrderStatus;
import net.javaspring.pta_backend.mapper.OrderMapper;
import net.javaspring.pta_backend.repository.OrderRepository;
import net.javaspring.pta_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = orderMapper.toEntity(orderDTO);
        order = orderRepository.save(order);
        return orderMapper.toDTO(order);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(orderMapper::toDTO)
                .orElse(null);
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderDTO updateOrderStatus(Long id, String status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(OrderStatus.valueOf(status));
                    order = orderRepository.save(order);
                    return orderMapper.toDTO(order);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
} 