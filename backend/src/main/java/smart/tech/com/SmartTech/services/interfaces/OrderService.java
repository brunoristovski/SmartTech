package smart.tech.com.SmartTech.services.interfaces;

import smart.tech.com.SmartTech.model.DTO.OrderDTO;
import smart.tech.com.SmartTech.model.DTO.OrderItemResponseDTO;
import smart.tech.com.SmartTech.model.DTO.OrderResponseDTO;
import smart.tech.com.SmartTech.model.domain.Order;
import smart.tech.com.SmartTech.model.enumerations.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderService {

    List<Order> findAll();

    Optional<Order> findById(long orderId);

    Optional<Order> createOrder (OrderDTO orderDTO);

    Optional<Order> submitOrder(Long orderId);

    Optional<Order> cancelOrder(Long orderId);

    List<OrderResponseDTO> findOrdersForCurrentUser(String username);

    List<OrderItemResponseDTO> findOrderByIdForCurrentUser(Long orderId, String username);
}
