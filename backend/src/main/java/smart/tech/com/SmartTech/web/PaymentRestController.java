package smart.tech.com.SmartTech.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import smart.tech.com.SmartTech.model.DTO.StripeResponseDTO;
import smart.tech.com.SmartTech.model.domain.Order;
import smart.tech.com.SmartTech.model.exceptions.OrderNotFoundException;
import smart.tech.com.SmartTech.services.impl.StripeService;
import smart.tech.com.SmartTech.services.interfaces.OrderService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/payment")
public class PaymentRestController {

    private final StripeService stripeService;
    private final OrderService orderService;

    public PaymentRestController(StripeService stripeService, OrderService orderService) {
        this.stripeService = stripeService;
        this.orderService = orderService;
    }

    @PostMapping("/checkout/{orderId}")
    public ResponseEntity<StripeResponseDTO> checkoutOrder(@PathVariable Long orderId) {
        Order order = orderService.findById(orderId)
                .orElseThrow(OrderNotFoundException::new);

        StripeResponseDTO stripeResponse = stripeService.checkoutOrder(order);

        return ResponseEntity.ok(stripeResponse);
    }
}
