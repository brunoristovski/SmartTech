import React from "react";
import { useNavigate } from "react-router-dom";
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
                <button className="btn btn-primary store-btn" onClick={goToProducts}>
                    Shop Now
                </button>
            </div>
        </div>
    );
};

export default HomePage;
