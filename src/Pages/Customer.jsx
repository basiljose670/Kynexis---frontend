import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import "./Customer.css";

export default function Customer() {

  const navigate = useNavigate();
  const{ refreshCartCount, searchText }= useOutletContext();
  const { name } = useParams(); // ⭐ category name from URL
  const isActive = (cat) => {
  if (!name && cat === "all") return true;
      return name === cat;
    };


  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // default all
      })
      .catch(err => console.log("Error fetching products", err));
  }, []);


 useEffect(() => {
  let result = products;

  // Category filter
  if (name) {
    result = result.filter(
      (p) => p.category?.toLowerCase() === name.toLowerCase()
    );
  }

  // 🔍 Search filter (partial match)
  if (searchText) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  setFilteredProducts(result);
}, [name, products, searchText]);


  return (
    <div className="customer-page">

      <h1 className="title">Welcome to Kynexis</h1>
      <h2 className="subtitle">Available Products</h2>

      <div className="category-section">

  <div
    className={`category-item ${isActive("all") ? "active-cat" : ""}`}
    onClick={() => navigate("/customer")}
  >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-RDPheipy5oD0Mc59_rCj8yP1QRuXMQT37jqp6-JpKA&s" alt="All" />
    <p>All</p>
  </div>

  <div
    className={`category-item ${isActive("electronics") ? "active-cat" : ""}`}
    onClick={() => navigate("/customer/category/electronics")}
  >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwvUJRTWhOsx0tJ9_glXhu7NG-eYzbn9vpg&s" alt="Electronics" />
    <p>Electronics</p>
  </div>

  <div
    className={`category-item ${isActive("automobiles") ? "active-cat" : ""}`}
    onClick={() => navigate("/customer/category/automobiles")}
  >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqT4y1hDoB1nztqhezDPf2mj81F0v0G9UJkg&s" alt="Automobiles" />
    <p>Automobiles</p>
  </div>

  <div
    className={`category-item ${isActive("fashion") ? "active-cat" : ""}`}
    onClick={() => navigate("/customer/category/fashion")}
  >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuh5I1A5R1oEKiRGCTHXKq0U43a85QUGlXA&s" alt="Fashion" />
    <p>Fashion</p>
  </div>

  <div
    className={`category-item ${isActive("toys") ? "active-cat" : ""}`}
    onClick={() => navigate("/customer/category/toys")}
  >
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVUxi7gDrHm8RJqna0s1sU2ItIkwRbW1H0jg&s" alt="Toys" />
    <p>Toys</p>
  </div>

</div>


      <div className="product-list">

        {filteredProducts.map((p) => (
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
