import React, { useEffect, useState } from 'react';

export default function ViewAllusers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/viewAll")
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
            <th>Password</th>
            <th>User Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.password}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
