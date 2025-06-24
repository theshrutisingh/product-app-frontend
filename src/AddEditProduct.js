import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/`)
        .then((res) => {
          const product = res.data;
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setImage(product.image);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch product details");
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !price || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setError(null);

    const productData = { name, price, description, image };

    if (id) {
      // Edit existing product - PUT request
      axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/`, productData)
        .then(() => {
          setLoading(false);
          navigate("/"); // redirect to home after update
        })
        .catch(() => {
          setError("Failed to update product");
          setLoading(false);
        });
    } else {
      // Add new product - POST request
      axios
        .post(`${process.env.REACT_APP_API_BASE_URL}/api/products/`, productData)
        .then(() => {
          setLoading(false);
          navigate("/"); // redirect to home after create
        })
        .catch(() => {
          setError("Failed to create product");
          setLoading(false);
        });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fafafa" }}>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </label>
        <label>
          Price:<br />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            step="0.01"
          />
        </label>
        <label>
          Description:<br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            rows={3}
          />
        </label>
        <label>
          Image URL:<br />
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
          />
        </label>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProduct;
