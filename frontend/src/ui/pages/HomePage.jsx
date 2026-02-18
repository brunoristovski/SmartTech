import React, { useEffect, useState } from "react";
import productRepository from "../../repository/productRepository.js";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
                const response = await productRepository.findAllProducts();
                setProducts(response.data);
        };
        fetchProducts();
    }, []);

    return (
        <div className="container-fluid">
            <h1>Products</h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {products.map((product) => (
                    <div key={product.id} style={{ width: "100%" }}>
                        <div className="card" style={{ width: "100%" }}>
                            <img
                                src={product.imageUrl || "https://via.placeholder.com/300"}
                                className="card-img-top"
                                alt={product.name}
                                style={{
                                    height: "200px",
                                    objectFit: "cover"
                                }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Price:</strong> {product.price} $</p>
                                <p><strong>Quantity:</strong> {product.stockQuantity}</p>

                                <button className="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );



};

export default HomePage;