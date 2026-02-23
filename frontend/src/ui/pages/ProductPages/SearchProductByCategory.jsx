import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productRepository from "../../../repository/productRepository.js";
import ProductCard from "../../components/ProductCard.jsx";
import "../../../App.css";

const SearchProductByCategory = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get("category");

    useEffect(() => {
        if (!category) return;

        const fetchProducts = async () => {
            try {
                const res = await productRepository.getProductsByCategory(category);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products by category:", err);
                setProducts([]);
            }
        };
        fetchProducts();
    }, [category]);

    return (
        <div className="container-fluid">
            <h1 className="text-center mb-4">Category: {category}</h1>

            <div className="products-grid">
                {products.length === 0 && <p>No products found for this category.</p>}
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchProductByCategory;