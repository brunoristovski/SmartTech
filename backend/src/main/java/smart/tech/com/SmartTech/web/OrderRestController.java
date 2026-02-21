package smart.tech.com.SmartTech.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import smart.tech.com.SmartTech.model.DTO.OrderDTO;
import smart.tech.com.SmartTech.model.DTO.OrderItemResponseDTO;
import smart.tech.com.SmartTech.model.DTO.OrderResponseDTO;
import smart.tech.com.SmartTech.model.domain.Order;
import smart.tech.com.SmartTech.services.impl.StripeService;
import smart.tech.com.SmartTech.services.interfaces.OrderItemService;
import smart.tech.com.SmartTech.services.interfaces.OrderService;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/orders")
public class OrderRestController {

    private final OrderService orderService;


    public OrderRestController(OrderService orderService, OrderItemService orderItemService, StripeService stripeService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody OrderDTO orderDTO, Authentication authentication) {

        String username = authentication.getName(); // земи username од auth
        return orderService.createOrder(orderDTO, username)
                .map(order -> ResponseEntity.ok().body(order))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/submit/{id}")
    public ResponseEntity<Order> submitOrder(@PathVariable Long id) {
        return orderService.submitOrder(id)
                .map(order -> ResponseEntity.ok().body(order))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long id) {

        return orderService.cancelOrder(id)
                .map(order -> ResponseEntity.ok().body(order))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(Authentication authentication) {

        return ResponseEntity.ok(
                orderService.findOrdersForCurrentUser(authentication.getName())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<OrderItemResponseDTO>> getOrderById(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.findOrderByIdForCurrentUser(id, authentication.getName())
        );
    }
}
