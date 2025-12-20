import React, { useState } from 'react';

export default function UpdateUser() {

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  const validate = () => {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=(.*\d){4,}).*$/;

    if (id === "") {
      alert("Id must be Required");
      return;
    }

    if (email !== "" && !emailPattern.test(email)) {
      alert("Please Enter Valid Email Address");
      return;
    }

    if (password !== "" && !passwordPattern.test(password)) {
      alert("Password should contain at least 4 numbers");
      return;
    }

    handleUpdate();
  };

  const handleUpdate = async () => {

    const response = await fetch("http://localhost:8080/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        username, email, password, dob, gender, role
      })
    });

    const result = await response.text();

    if (result === "Updated Successfully") {
      setMessage(result);
      setColor("green");
    } else {
      setMessage("User doesn't exist");
      setColor("red");
    }
  };

  return (
    <div className="container">

      <form method="post" className="form-container">
        <h2>Update User</h2>

        <div className="form-group">
          <label>User's ID:</label>
          <input
            type="number"
            placeholder="Enter Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            placeholder="Update Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>User Email Address:</label>
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>User Password:</label>
          <input
            type="text"
            placeholder="Update Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <input
            type="text"
            placeholder="Update Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            placeholder="Update Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={validate}>
          Update User
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>

    </div>
  );
}
