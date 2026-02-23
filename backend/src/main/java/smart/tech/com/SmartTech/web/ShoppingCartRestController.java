package smart.tech.com.SmartTech.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import smart.tech.com.SmartTech.model.DTO.ShoppingCartDTO;
import smart.tech.com.SmartTech.model.DTO.ShoppingCartItemDTO;
import smart.tech.com.SmartTech.model.domain.ShoppingCartItem;
import smart.tech.com.SmartTech.model.domain.User;
import smart.tech.com.SmartTech.services.interfaces.ShoppingCartItemService;
import smart.tech.com.SmartTech.services.interfaces.ShoppingCartService;
import smart.tech.com.SmartTech.services.interfaces.UserService;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;


@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/shopping_cart")
public class ShoppingCartRestController {

    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final ShoppingCartItemService shoppingCartItemService;

    public ShoppingCartRestController(UserService userService, ShoppingCartService shoppingCartService, ShoppingCartItemService shoppingCartItemService) {
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.shoppingCartItemService = shoppingCartItemService;
    }

    @GetMapping()
    public ResponseEntity<ShoppingCartDTO> getShoppingCart(Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        return shoppingCartService.getShoppingCartById(user.getShoppingCart().getId())
                .map(shoppingCartDTO -> ResponseEntity.ok().body(shoppingCartDTO))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add_item")
    public ResponseEntity<ShoppingCartItem> addItemToShoppingCart(@RequestBody ShoppingCartItemDTO shoppingCartItemDTO) {
        return shoppingCartItemService.createShoppingCartItem(shoppingCartItemDTO)
                .map(shoppingCartItem -> ResponseEntity.ok().body(shoppingCartItem))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete_item/{id}")
    public ResponseEntity deleteItemFromShoppingCart(@PathVariable Long id) {

        shoppingCartItemService.deleteShoppingCartItem(id);
        if(shoppingCartItemService.findShoppingCartItemById(id).isEmpty()) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
}
