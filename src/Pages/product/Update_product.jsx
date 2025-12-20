import React, { useState } from 'react'
import axios from 'axios';

export default function Update_product() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  const handleUpdate = async () => {

    const orNull = (value) => value === "" ? null : value;

    axios.post("http://localhost:8080/updateProduct", {
      id: Number(id),
      name: orNull(name),
      description: orNull(description),
      price: orNull(price) !== null ? Number(price) : null,
      photo: orNull(photo),
      category: orNull(category),
      reviews: orNull(reviews) ? reviews.split(",") : null
    })
    .then(res => {
      setMessage(res.data);
      setColor("green");
    })
    .catch(err => {
      setMessage("Error updating product");
      setColor("red");
    });
  };

  return (
    <div className="container">

      <form method="post" className="form-container">
        <h2>Update Product</h2>

        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="number"
            placeholder="Enter Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Update Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Description:</label>
          <input
            type="text"
            placeholder="Update Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Update Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Product Photo Address:</label>
          <input
            type="text"
            placeholder="Image Address"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            placeholder="Update Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Review:</label>
          <input
            type="text"
            placeholder="Review"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update Product
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>

    </div>
  );
}
