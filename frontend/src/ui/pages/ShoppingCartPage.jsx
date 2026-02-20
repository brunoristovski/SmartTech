import React, { useEffect, useState } from "react";
import shoppingCartRepository from "../../repository/shoppingCartRepository";

const ShoppingCartPage = () => {
    const [shoppingCart, setShoppingCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingCart = async () => {
            try {
                const res = await shoppingCartRepository.findShoppingCartById();
                setShoppingCart(res.data);
            } catch (err) {
                console.error("Error fetching shopping cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchShoppingCart();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-end">
                <div className="col-md-4">
                    <h2>Shopping Cart</h2>
                    <p>
                        <strong>Total Items:</strong> {shoppingCart?.shoppingCartItemDTOList?.length ?? 0}
                    </p>
                    <p>
                        <strong>Total Amount:</strong> ${shoppingCart?.totalAmount ?? 0}
                    </p>
                    <button className="btn btn-success w-100">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;