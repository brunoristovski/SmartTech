import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderRepository from "../../repository/orderRepository.js";
import axiosInstance from "../../axios/axios.js";

const OrdersPage = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await orderRepository.getOrdersForCurrentUser();
            setOrders(response.data);
        } catch (error) {
            console.error("Error loading orders", error);
        }
    };

    const handleCancel = async (id) => {
        try {
            await orderRepository.cancelOrder(id);
            loadOrders();
        } catch (error) {
            console.error("Error cancelling order", error);
        }
    };

    const handleInfo = (id) => {
        navigate(`/orders/${id}`);
    };


    const handlePay = async (orderId) => {
        try {
            const response = await axiosInstance.post(`/payment/checkout/${orderId}`);
            const sessionURL = response.data.sessionURL;

            if (sessionURL) {
                window.location.href = sessionURL; // korisnik otide na Stripe
            }
        } catch (error) {
            console.error("Error during Stripe checkout:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">My Orders</h2>

            {orders.map(order => (
                <div key={order.id} className="card mb-3 shadow-sm">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-8 p-3">
                            <h5>Order #{order.id}</h5>
                            <p className="mb-1"><strong>Date: </strong> {order.orderDate}</p>
                            <p className="mb-1"><strong>Status: </strong> {order.status}</p>
                            <p className="mb-1"><strong>Total: </strong> ${order.totalAmount}</p>
                            <p className="mb-1"><strong>Adress: </strong> {order.address}</p>
                            <p className="mb-1"><strong>City: </strong> {order.city}</p>
                            <p className="mb-1"><strong>Zipcode: </strong> {order.zipcode}</p>
                        </div>

                        <div className="col-md-4 text-end p-3">
                            <button
                                className="btn btn-outline-dark me-2"
                                onClick={() => handleInfo(order.id)}
                            >
                                Info
                            </button>

                            <button
                                className="btn btn-outline-success me-2"
                                onClick={() => handlePay(order.id)}
                            >
                                Pay
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={() => handleCancel(order.id)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {orders.length === 0 && (
                <div className="text-center mt-5">
                    <h5>No orders found.</h5>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;