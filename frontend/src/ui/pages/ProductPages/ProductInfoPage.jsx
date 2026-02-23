import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productRepository from "../../../repository/productRepository.js";

const ProductInfoPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productRepository.findProductById(id);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product info:", err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p className="text-center mt-4">Loading product info...</p>;

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">{product.name}</h2>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid mb-3"
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
            />
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>In Stock:</strong> {product.stockQuantity}</p>
        </div>
    );
};

export default ProductInfoPage;