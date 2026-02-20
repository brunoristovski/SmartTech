import React, { useEffect, useState } from "react";
import productRepository from "../../repository/productRepository.js";
import ProductCard from "../components/ProductCard.jsx";
import "../../App.css"

const ProductsPage = () => {
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
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
