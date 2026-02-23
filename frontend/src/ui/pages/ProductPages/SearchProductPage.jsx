import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import productRepository from "../../../repository/productRepository.js";
import ProductCard from "../../components/ProductCard.jsx";
import "../../../App.css";

const SearchProductPage = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    // Читање на search param од URL
    const query = new URLSearchParams(location.search);
    const searchTerm = query.get("search")?.toLowerCase() || "";

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

    // Филтрирани продукти според search term (prefix, postfix, infix)
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container-fluid">
            <h1 className="text-center mb-4">
                Search Results for "{searchTerm}"
            </h1>

            {filteredProducts.length === 0 && (
                <p className="text-center">No products found.</p>
            )}

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchProductPage;