import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./CustomerLayout.css";

export default function CustomerLayout() {

  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");


  const userId = localStorage.getItem("userId");

  // 🔥 Fetch cart count when customer pages open
  const loadCartCount = () => {
    if (!userId) return;

    fetch(`http://localhost:8080/cart/get?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setCartCount(data.products?.length || 0);
      })
      .catch(() => console.log("Error fetching cart count"));
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  // ye function child components (Customer.jsx, CustomerCart.jsx) ko milega
  const refreshCartCount = () => loadCartCount();

  return (
    <>
      {/* ⭐ NAVBAR WITH CART COUNT ⭐ */}
      <div className="customer-navbar">
        <h2 className="logo" onClick={() => navigate("/customer")}>
          Kynexis
        </h2>

         {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

        <div className="cart-icon" onClick={() => navigate("/customer/cart")}>
          🛒 <span className="count">{cartCount}</span>
        </div>
      </div>

      {/* ALL CHILD CUSTOMER PAGES */}
      <Outlet context={{ refreshCartCount, searchText }} />
    </>
  );
}
