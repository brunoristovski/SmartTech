import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import productRepository from "../../../repository/productRepository.js";
import ProductCard from "../../components/ProductCard.jsx";
import AuthContext from "../../../contexts/authContext.js";
import "../../../App.css"

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // state за категории
    const { user, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

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

        const fetchCategories = async () => {
            try {
                const res = await productRepository.getAllCategories();
                // Ако backend враќа enum, map-ирајме во листа од string
                const cats = res.data.map(cat => (typeof cat === "string" ? cat : cat.name));
                setCategories(cats);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const isAdmin = () => {
        return isLoggedIn && user?.roles?.includes("ROLE_ADMIN");
    };

    const handleCategoryClick = (category) => {
        navigate(`/searchByCategory?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="container-fluid">
            {/* НАСЛОВ И CREATE BUTTON НАД ЛЕВИОТ И ДЕСНИОТ ДЕЛ */}
            <div className="text-center mb-4">
                <h1 className={"mb-4"}>Products</h1>

                {isAdmin() && (
                    <Link to="/create-product" className="btn btn-green-outline">
                        Create Product
                    </Link>
                )}
            </div>

            <div className="d-flex">
                {/* Лев div со категории */}
                <div className="categories-panel me-4" style={{ minWidth: "200px" }}>
                    <h5>Categories</h5>
                    {categories.length === 0 && <p>Loading categories...</p>}
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className="btn btn-outline-primary w-100 mb-2"
                            onClick={() => handleCategoryClick(cat)} // сите корисници можат да кликнат
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Десен дел со продукти */}
                <div className="products-grid flex-grow-1">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;