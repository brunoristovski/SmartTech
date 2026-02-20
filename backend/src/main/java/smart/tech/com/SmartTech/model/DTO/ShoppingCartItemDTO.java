package smart.tech.com.SmartTech.model.DTO;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import smart.tech.com.SmartTech.model.enumerations.Category;


@Getter
@Setter
public class ShoppingCartItemDTO {

    @NotNull
    private Long shoppingCartId;

    @NotNull
    private Long productId;

    @NotNull
    private Integer quantity;

    private String productName;

    private String productImage;

    private Category productCategory;

    private Double productPrice;

    private Long shoppingCartItemId;
}
