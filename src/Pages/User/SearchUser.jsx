import React, { useState } from 'react';

export default function SearchUser() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/search?id=${id}`);

      if (!response.ok) {
        setMessage("User Not Found");
        setColor("red");
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data);
      setMessage("User Found!");
      setColor("green");

    } catch (err) {
      setMessage("Error Fetching User");
      setColor("red");
      setUser(null);
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
      {user && (
        <div style={{ marginTop: "20px", lineHeight: "30px" }}>
          <h3>User Details:</h3>
          <p><b>Name:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Gender:</b> {user.gender}</p>
          <p><b>Role:</b> {user.role}</p>
          <p><b>DOB:</b> {user.dob}</p>
        </div>
      )}

    </div>
  );
}
