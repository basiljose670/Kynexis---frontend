import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("User");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("red");

  const validate = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=(.*\d){4,}).*$/;

    if (username === "") {
      alert("Please enter your username");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password should contain at least 4 numbers");
      return;
    }

    if (dob === "") {
      alert("Please enter your date of birth");
      return;
    }

    if (gender === "") {
      alert("Please enter your gender");
      return;
    }

    handleSignUp();
  };


  const handleSignUp = async () => {

    const response = await fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, dob, gender, role })
    });

    const result = await response.text();

    if (result === "Success") {
      setMessage("(Congrats! You are Signed Up)");
      setColor("green");

      setTimeout(() => navigate('/'), 2000);

    } else {
      setMessage("(You are Already Registered)");
      setColor("red");
    }
  };

  return (
    <div className="signup-wrapper">
      
      <div className="signup-outer">
        <h3 className="signup-title">Fill Your Information</h3>

        <form method="post" className="signup-form-container">

          <div className="signup-form-group">
            <label>User Name:</label>
            <input
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Email Address:</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Password:</label>
            <input
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <label>Gender:</label>
            <input
              type="text"
              placeholder="Enter Your Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div className="signup-form-group">
            <button type="button" onClick={validate}>Sign Up</button>
          </div>

          <p style={{ color, textAlign: "center" }}>{message}</p>

        </form>
      </div>
    </div>
  );
}
