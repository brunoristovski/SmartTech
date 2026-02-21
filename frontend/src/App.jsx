import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./ui/components/Navbar.jsx";
import ProductsPage from "./ui/pages/ProductsPage.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
import Footer from "./ui/components/Footer.jsx";
import LoginPage from "./ui/pages/LoginPage.jsx";
import RegisterPage from "./ui/pages/RegisterPage.jsx";
import EditUserPage from "./ui/pages/EditUserPage.jsx";
import ShoppingCartPage from "./ui/pages/ShoppingCartPage.jsx";
import OrderItemsPage from "./ui/pages/OrderItemsPage.jsx";
import OrdersPage from "./ui/pages/OrdersPage.jsx";
import CreateOrderPage from "./ui/pages/CreateOrderPage.jsx";
import CreateProductPage from "./ui/pages/CreateProductPage.jsx";
import ProductInfoPage from "./ui/pages/ProductInfoPage.jsx";
import EditProductPage from "./ui/pages/EditProductPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="routes-wrapper">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
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
            <Footer />
        </BrowserRouter>
    );
}

export default App;
