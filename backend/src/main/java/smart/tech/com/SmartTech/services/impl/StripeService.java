package smart.tech.com.SmartTech.services.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import smart.tech.com.SmartTech.model.DTO.StripeResponseDTO;
import smart.tech.com.SmartTech.model.domain.Order;

@Service
public class StripeService {

    //stripe-API
    @Value("${stripe.secretKey}")
    private String secretKey;

    //Stripe request -> productName,amount,currency,quantity
    //Stripe response -> status,message,sessionId,sessionUrl

    public StripeResponseDTO checkoutOrder(Order order) {
        Stripe.apiKey = secretKey;

        // Единствен line item со totalAmount од order
        SessionCreateParams.LineItem.PriceData.ProductData productData =
                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName("Order #" + order.getId())
                        .build();

        SessionCreateParams.LineItem.PriceData priceData =
                SessionCreateParams.LineItem.PriceData.builder()
                        .setUnitAmount((long)(order.getTotalAmount() * 100)) // cents
                        .setCurrency("usd")
                        .setProductData(productData)
                        .build();

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(priceData)
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/orders")
                .setCancelUrl("http://localhost:3000/orders")
                .setClientReferenceId(order.getId().toString()) // <-- ovde go dodavame orderId
                .addLineItem(lineItem)
                .build();

        try {
            Session session = Session.create(params);

            return StripeResponseDTO.builder()
                    .status("SUCCESS")
                    .message("Payment session created")
                    .sessionId(session.getId())
                    .sessionURL(session.getUrl())
                    .build();
        } catch (StripeException e) {
            return StripeResponseDTO.builder()
                    .status("FAILED")
                    .message(e.getMessage())
                    .build();
        }
    }
}
