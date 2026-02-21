import React, { useState, useEffect } from "react";
import productRepository from "../../repository/productRepository.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProductPage = () => {
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        price: "",
        stockQuantity: ""
    });

    const [categories, setCategories] = useState([]);

    // fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productRepository.getAllCategories();
                setCategories(res.data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                toast.error("Failed to load categories");
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productData.name || !productData.description || !productData.imageUrl ||
            !productData.category || !productData.price || !productData.stockQuantity) {
            toast.error("All fields are required!");
            return;
        }

        const payload = {
            ...productData,
            price: parseFloat(productData.price),
            stockQuantity: parseInt(productData.stockQuantity)
        };

        try {
            await productRepository.createProduct(payload);
            toast.success("Product created successfully!");
            navigate("/products");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create product. Please try again.");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Create Product</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">-- Select a category --</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="form-control"
                        step="0.01"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Stock Quantity</label>
                    <input
                        type="number"
                        name="stockQuantity"
                        value={productData.stockQuantity}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default CreateProductPage;