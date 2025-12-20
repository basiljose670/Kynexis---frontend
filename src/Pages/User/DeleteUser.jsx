import React, { useState } from 'react';

export default function DeleteUser() {

  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/deleteProduct?id=${id}`);
      const result = await response.text();

      if (result === "Success") {
        setMessage("User Deleted Successfully");
        setColor("green");
      } else {
        setMessage("User was Already not Registered");
        setColor("red");
      }

    } catch (err) {
      setMessage("Error Deleting User");
      setColor("red");
    }
  };

  return (
    <div className="container">
      <form className="form-container">
        <h2>Delete User</h2>

        <div className="form-group">
          <label>User Id:</label>
          <input
            type="text"
            placeholder="Enter User Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleDelete}>
          Delete User
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>
    </div>
  );
}
