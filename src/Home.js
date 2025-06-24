import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles/main.css';
import { FaPlus, FaTrash, FaEdit, FaMoon, FaSun } from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/products/`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}/`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        setDeletingId(null);
      })
      .catch(() => {
        alert("Failed to delete product.");
        setDeletingId(null);
      });
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <header className="topbar">
        <h1 className="brand">🛍 My Product</h1>
        <div className="top-actions">
          <Link to="/add" className="icon-btn">
            <FaPlus />
          </Link>

          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
              src = {product.image}
              alt="Product"
              onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/200?text=No+Image';
            }}
          />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price}</p>
              <div className="product-actions">
                <Link to={`/edit/${product.id}`} className="icon-btn edit">
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="icon-btn delete"
                >
                  {deletingId === product.id ? "..." : <FaTrash />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
