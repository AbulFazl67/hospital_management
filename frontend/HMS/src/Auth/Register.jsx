import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";
import hospitalImg from "../assets/register.png";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!user.name || !user.email || !user.password) {
      alert("Please fill out all fields");
      return;
    }
    if (user.name.length < 6) {
      alert("Username must be at least 6 characters");
      return;
    }

   let emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$";
    if (!user.email.match(emailPattern)) {
      alert("Enter a valid email!");
      return;
    }
    if (user.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          fullname: user.name,
          role: "patient",
        }),
      });

      const data = await response.json();
      if (data.status === 201) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2 className="reg-logo">MAHEVI HEALTH CARE</h2>
          <h3>Welcome!</h3>

          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn">Register</button>
          </form>

          <p className="or-text">or</p>
          <p className="bottom-text">
            Already have an account? <NavLink to="/login">Login</NavLink>
          </p>
        </div>

        <div className="auth-image">
          <h2>Smart Healthcare, Seamless Management!</h2>
          <p>"Transforming healthcare with seamless and intelligent hospital management"</p>
          <img src={hospitalImg} alt="Hospital" />
        </div>
      </div>
    </div>
  );
};

export default Register;