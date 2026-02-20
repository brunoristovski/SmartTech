import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/authContext";
import userRepository from "../../repository/userRepository";

const EditUserPage = () => {
    const { user } = useContext(AuthContext);
    const [editData, setEditData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await userRepository.getInfoForEdit();
                setEditData(res.data);
            } catch (err) {
                console.error("Error fetching user info:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchUserInfo();
    }, [user]);

    const handleChange = (e) => {
        setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userRepository.edit(editData.username, editData);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Error updating profile");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Edit Account</h1>
            <div className="row">
                {/* Лева страна: card со информации */}
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">Your Information</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Username:</strong> {editData.username}</p>
                            <p><strong>First Name:</strong> {editData.firstName}</p>
                            <p><strong>Last Name:</strong> {editData.lastName}</p>
                            <p><strong>Phone:</strong> {editData.phoneNumber}</p>
                            <p><strong>Email:</strong> {editData.email}</p>
                        </div>
                    </div>
                </div>

                {/* Десна страна: форма за edit */}
                <div className="col-md-7">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="mb-0">Update Profile</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={editData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={editData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={editData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={editData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;