import React, { useState } from 'react'

export default function Search_product() {
    const [id, setId] = useState("");
      const [message, setMessage] = useState("");
      const [color, setColor] = useState("red");
      const [prod, setProd] = useState(null);
    
      const handleSearch = async () => {
        try {
          const response = await fetch(`http://localhost:8080/searchProduct?id=${id}`);
    
          if (!response.ok) {
            setMessage("User Not Found");
            setColor("red");
            setProd(null);
            return;
          }
    
          const data = await response.json();
          setProd(data);
          setMessage("User Found!");
          setColor("green");
    
        } catch (err) {
          setMessage("Error Fetching User");
          setColor("red");
          setProd(null);
        }
      };

  return (
    <div className="container">

      <form className="form-container">
        <h2>Search User</h2>

        <div className="form-group">
          <label>User Id:</label>
          <input
            type="text"
            placeholder="Enter User Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          Search User
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>

      {/* User Details Display */}
      {prod && (
        <div style={{ marginTop: "20px", lineHeight: "30px" }}>
          <h3>Product Details:</h3>
          <p><b>Name:</b> {prod.name}</p>
          <p><b>Decription:</b> {prod.description}</p>
          <p><b>Price:</b> {prod.price}</p>
          <p><b>Photo:</b> {prod.photo}</p>
          <p><b>Category:</b> {prod.category}</p>
          <p><b>Review:</b> {prod.review}</p>
        </div>
      )}

    </div>
  );
}
