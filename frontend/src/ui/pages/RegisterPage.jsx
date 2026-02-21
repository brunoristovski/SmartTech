import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userRepository from "../../repository/userRepository";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await userRepository.register(formData);
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4">Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control"
                               name="username"
                               value={formData.username}
                               onChange={handleChange}
                               required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control"
                               name="firstName"
                               value={formData.firstName}
                               onChange={handleChange}
                               required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control"
                               name="lastName"
                               value={formData.lastName}
                               onChange={handleChange}
                               required />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control"
                           name="phoneNumber"
                           value={formData.phoneNumber}
                           onChange={handleChange}
                           required />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control"
                               name="confirmPassword"
                               value={formData.confirmPassword}
                               onChange={handleChange}
                               required />
                    </div>
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;