import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerNavbar.css";

export default function CustomerNavbar() {

  const [count, setCount] = useState(0);
  const userId = localStorage.getItem("userId");

  // Load cart count initially
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8080/cart/get?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.products) {
          setCount(data.products.length);
        }
      })
      .catch(() => {});
  }, [userId]);


  // Listen for add/remove events from any page
  useEffect(() => {
    window.addEventListener("cartUpdated", (e) => {
      setCount(e.detail);
    });
  }, []);

  return (
    <div className="customer-navbar">

      <Link className="nav-home" to="/customer/home">
        🏠 Home
      </Link>

      <Link className="nav-cart" to="/customer/cart">
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{count}</span>
      </Link>

    </div>
  );
}
