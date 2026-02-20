package smart.tech.com.SmartTech.model.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ShoppingCartDTO {

    private Long shoppingCartId;
    private Double totalAmount;
    private List<ShoppingCartItemDTO> shoppingCartItemDTOList;

}
