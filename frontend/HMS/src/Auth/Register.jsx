import React from "react";
import { NavLink } from "react-router-dom";
import "./Auth.css";
import hospitalImg from "../assets/register.png"; 

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2 className="reg-logo">MHC</h2>
          <h3>Welcome!</h3>

          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
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
