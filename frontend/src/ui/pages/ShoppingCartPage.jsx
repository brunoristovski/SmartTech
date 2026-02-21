import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoppingCartRepository from "../../repository/shoppingCartRepository";
import "../../App.css"; // тука можеш да додадеш CSS за стилови

const ShoppingCartPage = () => {
    const [shoppingCart, setShoppingCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch shopping cart
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

    const handleDeleteItem = async (shoppingCartItemId) => {
        try {
            await shoppingCartRepository.deleteItemFromShoppingCart(shoppingCartItemId);

            // Ажурирај го локално shopping cart
            setShoppingCart(prev => {
                const newItems = prev.shoppingCartItemDTOList.filter(item => item.shoppingCartItemId !== shoppingCartItemId);
                const newTotal = newItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
                return {
                    ...prev,
                    shoppingCartItemDTOList: newItems,
                    totalAmount: newTotal
                };
            });
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Лева колона: shopping cart items */}
                <div className="col-md-8">
                    <h2>Shopping Cart Items</h2>
                    {shoppingCart?.shoppingCartItemDTOList?.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        shoppingCart.shoppingCartItemDTOList.map((item) => (
                            <div
                                key={item.productId}
                                className="card mb-3 p-2 d-flex flex-row align-items-center"
                                style={{ gap: "15px" }}
                            >
                                {/* Слика на продукт */}
                                <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    style={{ width: "120px", height: "100px", objectFit: "cover" }}
                                />

                                {/* Информации за продуктот */}
                                <div className="flex-grow-1 d-flex justify-content-between align-items-center">
                                    {/* Лева колона: name и category */}
                                    <div className="d-flex flex-column">
                                        <h5 className="mb-1">{item.productName}</h5>
                                        <p className="mb-0 text-muted">{item.productCategory}</p>
                                    </div>

                                    {/* Десна колона: price, quantity и subtotal */}
                                    <div className="d-flex flex-column text-end" style={{ fontWeight: "500" }}>
                                        <span>Price: ${item.productPrice.toFixed(2)}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Subtotal: ${(item.productPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Delete копче */}
                                {/* Delete копче */}
                                <button
                                    className="btn btn-danger d-flex align-items-center justify-content-center"
                                    style={{ width: "40px", height: "40px", padding: 0 }}
                                    onClick={() => handleDeleteItem(item.shoppingCartItemId)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Десна колона: summary */}
                <div className="col-md-4">
                    <div className="border p-3 rounded" style={{ borderColor: "#ccc" }}>
                        <h2>Shopping Cart Summary</h2>
                        <p><strong>Total Items:</strong> {shoppingCart?.shoppingCartItemDTOList?.length ?? 0}</p>
                        <p><strong>Total Amount:</strong> ${shoppingCart?.totalAmount?.toFixed(2) ?? 0}</p>
                        <button
                            className="btn btn-success w-100"
                            onClick={() => navigate("/create-order")}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPage;