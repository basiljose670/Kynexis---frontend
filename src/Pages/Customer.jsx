import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Customer.css";

export default function Customer() {

  const navigate = useNavigate();
  const refreshCartCount = useOutletContext().refreshCartCount;

  const [products, setProducts] = useState([]);

  const handleAddToCart = (productId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    fetch(`http://localhost:8080/cart/add?userId=${userId}&productId=${productId}`, {
      method: "POST"
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        refreshCartCount();   //  Immediately update navbar count
      })
      .catch(err => alert("Error adding to cart"));
  };

  useEffect(() => {
    fetch("http://localhost:8080/getAllProducts")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Error fetching products", err));
  }, []);

  return (
    <div className="customer-page">

      <h1 className="title">Welcome to Kynexis</h1>
      <h2 className="subtitle">Available Products</h2>

      <div className="product-list">

        {products.map((p) => (
          <div key={p.id} className="product-card">

            <img src={p.photo} alt={p.name} className="product-img" />

            <div className="info-box">
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
              <p className="desc">{p.description}</p>

              <button 
                className="add-btn"
                onClick={() => handleAddToCart(p.id)}
              >
                Add to Cart
              </button>

              <button onClick={() => navigate("/customer/cart")} className="cart-btn">
                Go to Cart
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
