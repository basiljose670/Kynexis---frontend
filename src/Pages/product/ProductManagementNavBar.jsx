import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './ProductManagementNavBar.css';

export default function ProductManagementNavBar() {
  const navigate = useNavigate();
  return (
    <div className="admin-links">

      <nav>

         <span 
          className="back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Back
        </span>

        <h3>Manage your products here:</h3>
        <NavLink to="addproduct" className="admin-card">Add new product</NavLink>
        <NavLink to="deleteProduct" className="admin-card">Delete product</NavLink>
        <NavLink to="updateProduct" className="admin-card">Update product</NavLink>
        <NavLink to="searchProduct" className="admin-card">Search product</NavLink>
        <NavLink to="viewAllProduct" className="admin-card">View All products</NavLink>
      </nav>

      <div className="container">   {/* OUTLET CENTER FIX */}
        <Outlet />
      </div>
      
    </div>
  );
}
