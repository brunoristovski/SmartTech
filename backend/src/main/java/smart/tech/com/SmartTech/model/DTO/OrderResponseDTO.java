package smart.tech.com.SmartTech.model.DTO;

import lombok.Getter;
import lombok.Setter;
import smart.tech.com.SmartTech.model.enumerations.OrderStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class OrderResponseDTO {

    private Long id;
    private String address;
    private String city;
    private String zipcode;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;

    private List<OrderItemResponseDTO> orderItems;
}