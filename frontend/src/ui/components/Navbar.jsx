import React from "react";
import { Link } from "react-router-dom";
import SmartTechLogo from "../../images/SmartTechLogo.png";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex align-items-center">

                {/* Лого и име */}
                <Link className="navbar-brand d-flex align-items-center me-3" to="/">
                    <img
                        src={SmartTechLogo}
                        alt="Logo"
                        height="50"
                        className="d-inline-block align-text-top me-2"
                    />
                    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Smart Tech</span>
                </Link>

                {/* Toggle за мобилни */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar links и search */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {/* Леви линкови */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                    </ul>

                    {/* Search bar – центриран и подолг */}
                    <form className="d-flex mx-auto" role="search" style={{ maxWidth: "500px", width: "100%" }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search for products"
                            aria-label="Search"
                            style={{ flexGrow: 1 }}
                        />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>

                    {/* Десни линкови */}
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/">Shopping Cart</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">My Orders</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
