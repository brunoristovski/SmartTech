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

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="routes-wrapper">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/editUser" element={<EditUserPage />} />
                    <Route path="/shoppingCart" element={<ShoppingCartPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:id" element={<OrderItemsPage />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
