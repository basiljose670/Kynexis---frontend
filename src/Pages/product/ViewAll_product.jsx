import React, { useEffect, useState } from 'react'

export default function ViewAll_product() {

     const [users, setUsers] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:8080/getAllProducts")
          .then(response => response.json())
          .then(data => setUsers(data));
      }, []);


  return (
    <div className="container">

      <h2>All Users</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Photo</th>
            <th>Category</th>
            <th>Review</th>
          </tr>
        </thead>

        <tbody>
          {users.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>{prod.price}</td>
              <td>{prod.photo}</td>
              <td>{prod.category}</td>
              <td>{prod.review}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}
