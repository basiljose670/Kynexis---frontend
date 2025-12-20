import React, { useState } from 'react';

export default function CreateUser() {

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

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password should be more than 4 numbers");
      return;
    }

    handleCreate();
  };

  const handleCreate = async () => {
    const response = await fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, dob, gender, role })
    });

    const result = await response.text();

    if (result === "Success") {
      setMessage("(New User Registered)");
      setColor("green");
    } else {
      setMessage("(User Already Registered)");
      setColor("red");
    }
  };

  return (
    <div className="container">

      <form method="post" className="form-container">

        <h2>Create New User</h2>

        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="text"
            placeholder="Enter Password"
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
            placeholder="Enter Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={validate}>
          Add User
        </button>

        <p style={{ color, textAlign: "center" }}>{message}</p>
      </form>

    </div>
  );
}
