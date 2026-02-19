import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={product.imageUrl || "https://via.placeholder.com/200"}
                alt={product.name}
            />

            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> {product.price} $</p>
                <p><strong>Quantity:</strong> {product.stockQuantity}</p>

                <button className="btn btn-primary w-100">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
