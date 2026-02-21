import React, { useState, useContext, useEffect } from "react";
import shoppingCartRepository from "../../repository/shoppingCartRepository";
import productRepository from "../../repository/productRepository";
import AuthContext from "../../contexts/authContext";
import {Link} from "react-router-dom";

const ProductCard = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const [shoppingCartId, setShoppingCartId] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await shoppingCartRepository.findShoppingCartById();
                setShoppingCartId(res.data.shoppingCartId);
            } catch (err) {
                console.error("Error fetching shopping cart:", err);
            }
        };
        if (user) fetchCart();
    }, [user]);

    const isAdmin = () => {
        return user?.roles?.includes("ROLE_ADMIN");
    };

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = async () => {
        if (!shoppingCartId) {
            alert("Shopping cart not loaded yet!");
            return;
        }

        const shoppingCartItemDTO = {
            shoppingCartId: shoppingCartId,
            productId: product.id,
            quantity: quantity
        };

        try {
            await shoppingCartRepository.addItemToShoppingCart(shoppingCartItemDTO);
            alert(`${quantity} x ${product.name} added to cart!`);
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await productRepository.deleteProductById(product.id);
            alert("Product deleted successfully!");
            window.location.reload(); // наједноставно решение
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete product");
        }
    };


    return (
        <div className="card product-card">
            <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%"
                }}
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted"><strong>Category: </strong>{product.category}</p>
                <p className="card-text"><strong>Description: </strong>{product.description}</p>
                <p className="card-text"><strong>Price: </strong>${product.price.toFixed(2)}</p>
                <p className="card-text"><strong>In Stock: </strong>{product.stockQuantity}</p>

                {/* Quantity selector се прикажува само ако е логиран корисник */}
                {user && (
                    <>
                        <div className="d-flex align-items-center mb-2">
                            <button className="btn btn-outline-secondary me-2" onClick={() => handleQuantityChange(-1)}>-</button>
                            <input
                                type="text"
                                className="form-control text-center"
                                value={quantity}
                                readOnly
                                style={{ width: "50px" }}
                            />
                            <button className="btn btn-outline-secondary ms-2" onClick={() => handleQuantityChange(1)}>+</button>
                        </div>

                        <button className="btn btn-outline-success w-100 btn-cart-custom" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </>
                )}
                <div className="mt-2">
                    <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-info w-100 btn-info-custom"
                    >
                        Info
                    </Link>
                </div>
                {isAdmin() && (
                    <div className="mt-2">
                        <Link
                            to={`/products/edit/${product.id}`}
                            className="btn btn-outline-warning w-100 btn-edit-custom"
                        >
                            Edit
                        </Link>
                    </div>
                )}
                {isAdmin() && (
                    <div className="mt-2">
                        <button
                            onClick={handleDelete}
                            className="btn btn-outline-danger w-100 btn-delete-custom"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;