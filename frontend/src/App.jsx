import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./ui/components/Navbar.jsx";
import ProductsPage from "./ui/pages/Products.jsx";
import HomePage from "./ui/pages/HomePage.jsx";
import Footer from "./ui/components/Footer.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="routes-wrapper">
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/products" element={<ProductsPage />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
