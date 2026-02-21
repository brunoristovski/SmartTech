import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import productRepository from "../../../repository/productRepository.js";
import ProductCard from "../../components/ProductCard.jsx";
import AuthContext from "../../../contexts/authContext.js";
import "../../../App.css"

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const { user, isLoggedIn } = useContext(AuthContext);

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

    // Функција за проверка дали корисникот е администратор
    const isAdmin = () => {
        return isLoggedIn && user?.roles?.includes("ROLE_ADMIN");
    };

    return (
        <div className="container-fluid">
            <h1 className="text-center mb-4">Products</h1>

            {/* Копче за креирање продукт, само за администратори */}
            {isAdmin() && (
                <div className="text-center mb-4">
                    <Link to="/create-product" className="btn btn-green-outline">
                        Create Product
                    </Link>
                </div>
            )}

            <div className="products-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;