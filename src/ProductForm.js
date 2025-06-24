import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const { id } = useParams(); // for edit
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchProduct = () => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/`)
      .then(res => setFormData(res.data))
      .catch(() => alert("Failed to load product"));
  };

  useEffect(() => {
    if (isEdit) fetchProduct();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = isEdit
      ? axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/`, formData)
      : axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products/`, formData);

    apiCall
      .then(() => navigate("/"))
      .catch(() => alert(isEdit ? "Update failed." : "Creation failed."));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>{isEdit ? "Edit" : "Add"} Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px" }}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
