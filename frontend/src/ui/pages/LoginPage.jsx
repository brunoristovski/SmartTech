import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import userRepository from "../../repository/userRepository";

const LoginPage = () => {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await userRepository.login(formData);
            login(response.data.token);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>

            <div className="mt-3 text-center">
                If you are still not registered please{" "}
                <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default LoginPage;