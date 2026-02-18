import React, { useEffect, useState } from "react";
import productRepository from "../../repository/productRepository.js";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productRepository.findAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="text-center mb-4">Products</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
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
                            <button className="btn btn-primary w-100">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
