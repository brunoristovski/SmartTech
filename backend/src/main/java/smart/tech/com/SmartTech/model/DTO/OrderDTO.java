package smart.tech.com.SmartTech.model.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class OrderDTO {

    @NotNull
    private String address;
    @NotNull
    private String city;
    @NotNull
    private String zipcode;
    @NotNull
    private Double totalAmount;
    @NotNull
    private String username;
}
