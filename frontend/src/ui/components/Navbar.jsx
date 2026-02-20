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
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item me-3">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                    </ul>

                    <form className="d-flex mx-auto" style={{ maxWidth: "500px", width: "100%" }}>
                        <input className="form-control me-2" type="search"
                               placeholder="Search for products" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

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

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button
                                            className="dropdown-item text-danger"
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