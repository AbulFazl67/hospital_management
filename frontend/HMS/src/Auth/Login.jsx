import { useState } from "react";
import "./Auth.css";
import { NavLink } from "react-router-dom";
import hospitalImg from "../assets/login.png";

const Login = () => {
  const [email, setemail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        if(data.msg.role=="admin"){
          console.warn("rediret to admin panel")
        }else if(data.msg.role=="doctor"){
          console.warn("redirect to doctor panel")
        }else if(data.msg.role=="clerk"){
          console.warn("redirect to clerk panel")
        }
      } else {
        setMessage(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
        <h2 className="reg-logo">MHC</h2>
        <h3>Welcome!</h3>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)} 
        />
        <input
          type="test"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">Log-In</button>
      </form>
       <p className="or-text">or</p>
          <p className="bottom-text">
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
      {message && <p>{message}</p>}
        </div>

      <div className="auth-image">
                <h2>Where Technology Meets Compassionate Care.</h2>
                <p>"Seamless Hospital Management For Smarter Faster, And Better Healthcare."</p>
                <img src={hospitalImg} alt="Hospital" />
              </div>

      </div>
    </div>
  );
};

export default Login;
