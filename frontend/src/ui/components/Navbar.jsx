import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import SmartTechLogo from "../../images/SmartTechLogo.png";

const Navbar = () => {

    const { user, isLoggedIn, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid d-flex align-items-center">

                <Link className="navbar-brand d-flex align-items-center me-3" to="/">
                    <img src={SmartTechLogo} alt="Logo" height="50"
                         className="d-inline-block align-text-top me-2" />
                </Link>

                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <Link className="nav-link nav-custom" to="/">Home</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link nav-custom" to="/products">Products</Link>
                        </li>
                    </ul>

                    <form className="d-flex mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search for products"
                        />
                        <button className="btn btn-outline-success btn-search" type="submit">
                            Search
                        </button>
                    </form>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* Покажи само ако е логиран корисник */}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item me-3">
                                    <Link
                                        className="nav-link icon-button"
                                        to="/shoppingCart"
                                    >
                                        <i className="bi bi-cart-check fs-5"></i>
                                    </Link>
                                </li>
                                <li className="nav-item me-3">
                                    <Link
                                        className="nav-link icon-button"
                                        to="/orders"
                                    >
                                        <i className="bi bi-archive fs-5"></i>
                                    </Link>
                                </li>
                            </>
                        )}

                        {!isLoggedIn ? (
                            <li className="nav-item">
                                <Link className="btn btn-primary ms-3" to="/login">
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item dropdown">
                                <button
                                    className="btn btn-outline-primary dropdown-toggle ms-3"
                                    data-bs-toggle="dropdown"
                                >
                                    Hi {user?.sub}
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end p-2">
                                    <li>
                                        <Link
                                            className="btn btn-outline-warning w-100 mb-2"
                                            to="/editUser"
                                        >
                                            Edit Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-outline-danger w-100"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;