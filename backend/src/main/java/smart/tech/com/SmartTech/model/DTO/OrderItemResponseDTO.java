package smart.tech.com.SmartTech.model.DTO;

import lombok.Getter;
import lombok.Setter;
import smart.tech.com.SmartTech.model.enumerations.Category;

@Getter
@Setter
public class OrderItemResponseDTO {

    private Long id;
    private String productName;
    private String productDescription;
    private String productImage;
    private Category productCategory;
    private Double productPrice;
    private Integer quantity;
    private Double subtotal;
}