package smart.tech.com.SmartTech.services.impl;

import org.springframework.stereotype.Service;
import smart.tech.com.SmartTech.model.DTO.ShoppingCartDTO;
import smart.tech.com.SmartTech.model.DTO.ShoppingCartItemDTO;
import smart.tech.com.SmartTech.model.domain.Product;
import smart.tech.com.SmartTech.model.domain.ShoppingCart;
import smart.tech.com.SmartTech.model.domain.ShoppingCartItem;
import smart.tech.com.SmartTech.model.exceptions.ShoppingCartNotFoundException;
import smart.tech.com.SmartTech.repository.ShoppingCartRepository;
import smart.tech.com.SmartTech.services.interfaces.ProductService;
import smart.tech.com.SmartTech.services.interfaces.ShoppingCartService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {


    private final ProductService productService;
    private final ShoppingCartRepository shoppingCartRepository;

    public ShoppingCartServiceImpl(ProductService productService, ShoppingCartRepository shoppingCartRepository) {
        this.productService = productService;
        this.shoppingCartRepository = shoppingCartRepository;
    }

    @Override
    public Optional<ShoppingCartDTO> getShoppingCartById(Long shoppingCartId) {
        ShoppingCart shoppingCart = shoppingCartRepository.findById(shoppingCartId).orElseThrow(ShoppingCartNotFoundException::new);
        ShoppingCartDTO shoppingCartDTO = new ShoppingCartDTO();
        shoppingCartDTO.setShoppingCartId(shoppingCartId);
        shoppingCartDTO.setTotalAmount(shoppingCart.getTotalAmount());

        List<ShoppingCartItemDTO> shoppingCartItemDTOList = new ArrayList<>();

        for(ShoppingCartItem shoppingCartItem: shoppingCart.getShoppingCartItems()){
            ShoppingCartItemDTO shoppingCartItemDTO = new ShoppingCartItemDTO();
            shoppingCartItemDTO.setQuantity(shoppingCartItem.getQuantity());

            Optional<Product> product = productService.getProduct(shoppingCartItem.getProduct().getId());
            if(product.isPresent()){
                shoppingCartItemDTO.setProductId(product.get().getId());
                shoppingCartItemDTO.setProductName(product.get().getName());
                shoppingCartItemDTO.setProductPrice(product.get().getPrice());
                shoppingCartItemDTO.setProductImage(product.get().getImageUrl());
                shoppingCartItemDTO.setProductCategory(product.get().getCategory());
            }
            shoppingCartItemDTOList.add(shoppingCartItemDTO);
        }
        shoppingCartDTO.setShoppingCartItemDTOList(shoppingCartItemDTOList);

        return Optional.of(shoppingCartDTO);
    }

}
