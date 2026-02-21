import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import shoppingCartRepository from "../../repository/shoppingCartRepository";
import orderRepository from "../../repository/orderRepository";

const CreateOrderPage = () => {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Load shopping cart to get totalAmount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await shoppingCartRepository.findShoppingCartById();
                setTotalAmount(res.data.totalAmount);
            } catch (err) {
                console.error("Error loading cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            address,
            city,
            zipcode,
            totalAmount
        };

        try {
            const res = await orderRepository.createOrder(orderData);
            console.log("Order created:", res.data);
            navigate("/orders"); // по креирањето, оди на Orders page
        } catch (err) {
            console.error("Error creating order:", err.response?.data || err);
        }
    };

    if (loading) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Create Order</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Zipcode</label>
                    <input
                        type="text"
                        className="form-control"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        value={`$${totalAmount.toFixed(2)}`}
                        disabled
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default CreateOrderPage;