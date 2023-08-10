import React, { useState } from "react";
import axios from "axios";
import "./sign.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if ( !name.trim()) {
      setError("Please enter  name.");
      return;
    }
    if (!email.trim() ) {
      setError("Please enter email");
      return;
    }

    if ( !location.trim()) {
      setError("Please enter  location.");
      return;
    }
    
    if ( !password.trim()) {
      setError("Please enter  password.");
      return;
    }

    
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        location,
        password,
      });
      console.log("Registration success:", response.data);
    navigate("/login")
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  return (
    <div className="signin">
      <div className="item">
        <h1>SignIn</h1>
      </div>

      <div className="main">
        {error && <p className="error">{error}</p>} {/* Show error message */}
        <form onSubmit={handleSubmit}>
          <div className="name">
            <h3>Name</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email">
            <h3>Email</h3>
            <input
              type="email"
              placeholder="Enter your email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="phone">
            <h3>location</h3>
            <input
              type="text"
              placeholder="Enter your location "
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="password">
            <h3>Password</h3>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;