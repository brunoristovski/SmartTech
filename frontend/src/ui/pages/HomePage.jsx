import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaMobileAlt, FaGamepad } from "react-icons/fa"; // за tech icons
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    const goToProducts = () => {
        navigate("/products");
    };

    return (
        <div className="store">
            <div className="store-overlay">
                <h1>Welcome to SmartTech</h1>
                <p>Your one-stop shop for the latest tech gadgets</p>
                <button className="btn store-btn" onClick={goToProducts}>
                    Shop Now
                </button>
            </div>

            {/* Floating tech icons */}
            <div className="floating-icons">
                <FaLaptop className="icon" />
                <FaMobileAlt className="icon" />
                <FaGamepad className="icon" />
            </div>
        </div>
    );
};

export default HomePage;