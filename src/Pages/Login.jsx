import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
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

    handleLogin();
  };

  const handleLogin = async () => {

    const response = await fetch("http://localhost:8080/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = "Invalid";
    }

    if (data === "Invalid") {
      setMessage("(Invalid Credentials)");
      setColor("red");
      return;
    }

    // 🔥 FIXED — Save correct userId field
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("role", data.role);

    if (data.role === "Admin") {
      navigate("/admin");
    } else {
      navigate("/customer");
    }
  };


  return (
    <div className="login-wrapper">

      <div className="login-outer">
        <img src="/Images/logo2.png" alt="logo" />

        <form className="login-form-container" onSubmit={(e)=>e.preventDefault()}>

          <div className="login-form-group">
            <input type="email" placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="login-form-group">
            <input type="password" placeholder="Enter Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="login-form-group">
            <button type="button" onClick={validate}>Login</button>
          </div>

          <p style={{ color, textAlign:"center" }}>{message}</p>

        </form>
      </div>

      <div className="signup-box">
        Don’t have an account? <span onClick={() => navigate('/SignUp')}>Sign up</span>
      </div>

    </div>
  );
}

export default Login;
