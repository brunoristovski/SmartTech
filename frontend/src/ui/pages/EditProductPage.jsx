import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productRepository from "../../repository/productRepository";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        price: "",
        stockQuantity: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Влечење продукт
                const productRes = await productRepository.findProductById(id);

                // Влечење категории
                const categoriesRes = await productRepository.getAllCategories();

                setProduct(productRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Error loading data", err);
                toast.error("Failed to load product data or categories");
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await productRepository.updateProduct(id, product);
            toast.success("Product updated successfully!");
            navigate("/products");
        } catch (err) {
            console.error("Update failed", err);
            toast.error("Failed to update product");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Edit Product</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        className="form-control"
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* CATEGORY DROPDOWN */}
                <div className="mb-3">
                    <label>Category</label>
                    <select
                        name="category"
                        className="form-select"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        className="form-control"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        name="stockQuantity"
                        className="form-control"
                        value={product.stockQuantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-warning w-100">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default EditProductPage;