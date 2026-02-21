import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderRepository from "../../repository/orderRepository.js";

const OrderItemsPage = () => {

    const { id } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadOrderItems();
    }, [id]);

    const loadOrderItems = async () => {
        try {
            const response = await orderRepository.getOrderByIdForCurrentUser(id);
            setItems(response.data);
        } catch (error) {
            console.error("Error loading order items", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Order #{id} Details</h2>

            {items.map(item => (
                <div key={item.id} className="card mb-3 shadow-sm">
                    <div className="row g-0 align-items-center">

                        <div className="col-md-2 text-center p-2">
                            <img
                                src={item.productImage}
                                alt={item.productName}
                                className="img-fluid rounded"
                                style={{ maxHeight: "120px" }}
                            />
                        </div>

                        <div className="col-md-7 p-3">
                            <h5>{item.productName}</h5>
                            <p className="mb-1"><strong>Category:</strong> {item.productCategory}</p>
                            <p className="mb-1">{item.productDescription}</p>
                        </div>

                        <div className="col-md-3 p-3 text-end">
                            <p className="mb-1"><strong>Price:</strong> ${item.productPrice}</p>
                            <p className="mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                            <p className="mb-1">
                                <strong>Subtotal:</strong> ${item.subtotal}
                            </p>
                        </div>

                    </div>
                </div>
            ))}

            {items.length === 0 && (
                <div className="text-center mt-5">
                    <h5>No items found.</h5>
                </div>
            )}
        </div>
    );
};

export default OrderItemsPage;