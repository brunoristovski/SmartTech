import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./ui/components/Navbar.jsx";
import ProductsPage from "./ui/pages/ProductPages/ProductsPage.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
import Footer from "./ui/components/Footer.jsx";
import LoginPage from "./ui/pages/UserPages/LoginPage.jsx";
import RegisterPage from "./ui/pages/UserPages/RegisterPage.jsx";
import EditUserPage from "./ui/pages/UserPages/EditUserPage.jsx";
import ShoppingCartPage from "./ui/pages/ShoppingCartPage.jsx";
import OrderItemsPage from "./ui/pages/OrderPages/OrderItemsPage.jsx";
import OrdersPage from "./ui/pages/OrderPages/OrdersPage.jsx";
import CreateOrderPage from "./ui/pages/OrderPages/CreateOrderPage.jsx";
import CreateProductPage from "./ui/pages/ProductPages/CreateProductPage.jsx";
import ProductInfoPage from "./ui/pages/ProductPages/ProductInfoPage.jsx";
import EditProductPage from "./ui/pages/ProductPages/EditProductPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="routes-wrapper">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/create-product" element={<CreateProductPage />} />
                    <Route path="/products/:id" element={<ProductInfoPage />} />
                    <Route path="/products/edit/:id" element={<EditProductPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/editUser" element={<EditUserPage />} />
                    <Route path="/shoppingCart" element={<ShoppingCartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OrderItemsPage />} />
                    <Route path="/create-order" element={<CreateOrderPage />} />
                </Routes>
            </div>

            {/* 🔥 Toast Notification Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <Footer />
        </BrowserRouter>
    );
}

export default App;