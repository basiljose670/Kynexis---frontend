import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./CustomerCart.css";

export default function CustomerCart() {

  const [cart, setCart] = useState(null);
  const refreshCartCount = useOutletContext().refreshCartCount;

  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <h2>Please login to view your cart.</h2>;
  }

  // LOAD CART
  const loadCart = () => {
    fetch(`http://localhost:8080/cart/get?userId=${userId}`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.log("Error loading cart", err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (!cart || !cart.products) return <h2>Loading Cart...</h2>;

  const total = (cart.products || []).reduce((sum, p) => sum + p.price, 0);

  // REMOVE PRODUCT
  const handleRemove = (productId) => {
    fetch(`http://localhost:8080/cart/remove?userId=${userId}&productId=${productId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(updatedCart => {
        setCart(updatedCart);  
        refreshCartCount(); // ⭐ navbar count update
      })
      .catch(() => alert("Error removing product"));
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cart.products.map((prod, index) => (
          <div className="cart-card" key={prod.id}>
            <img src={prod.photo} alt={prod.name} />

            <div className="cart-info">
              <h3>{prod.name}</h3>
              <p>₹ {prod.price}</p>
              <p>{prod.description}</p>

              <button 
                className="remove-btn"
                onClick={() => handleRemove(prod.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="total">Total: ₹ {total}</h2>
    </div>
  );
}
