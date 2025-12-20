import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add_product() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  // ---------------- VALIDATION ----------------
  function validateForm(e) {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Write Product Name");
      return;
    }

    if (description.trim() === "") {
      alert("Write Description");
      return;
    }

    if (price === "" || isNaN(price)) {
      alert("Write a valid Price");
      return;
    }

    if (photo.trim() === "") {
      alert("Give Product Image Address");
      return;
    }

    if (category.trim() === "") {
      alert("Give Category of the Product");
      return;
    }

    // ✔ If everything correct — submit
    handleSubmit();
  }

  // ---------------- API CALL ----------------
  async function handleSubmit() {
    const data = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      photo: photo.trim(),
      category: category.trim()
    };

    try {
      const resp = await fetch("http://localhost:8080/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const msg = await resp.text();

      if (msg === "Success") {
        setMessage("(Product Added Successfully)");
        setColor("green");
        navigate("/pm"); // Go to product management
      } else {
        alert("Error occurred: " + msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit data");
    }
  }

  return (
    <>
      <h4>Add product below</h4>
      <br />

      <form onSubmit={validateForm}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.trimStart())}
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value.trimStart())}
          />
        </div>

        <div className="form-group">
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "200px", padding: "8px" }}
          />
        </div>

        <div className="form-group">
          <label>Image Address: </label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value.trimStart())}
          />
        </div>

        <div className="form-group">
          <label>Category: </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value.trimStart())}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>
    </>
  );
}
