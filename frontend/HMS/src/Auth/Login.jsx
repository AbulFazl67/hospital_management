import { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import hospitalImg from "../assets/login.png";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const password=window.btoa(user.password)
      console.warn("password is" , password)
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, password: password }),
      });

      const data = await response.json();
      if (data.msg) {
        setMessage("Login successful!");
        console.warn(data)
        if (data.msg.role === "admin") {
          localStorage.setItem("userId", data.msg.user_id);
          console.warn("Redirect to admin panel");
          navigate("/admin/dashboard")
        } else if (data.msg.role === "doctor") {
          localStorage.setItem("userId", data.msg.user_id);
          console.warn("Redirect to doctor panel");
          navigate("/doctors/dashboard")
        } else if (data.msg.role === "clerk") {
          localStorage.setItem("userId", data.msg.user_id);
          console.warn("Redirect to clerk panel");
          navigate("/clerk/dashboard")
        } else if (data.msg.role === "patient") {
          console.warn("Redirect to patient dashboard");
          localStorage.setItem("userId", data.msg.user_id);
          navigate("/patient/dashboard");
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
          <h2 className="reg-logo">MAHEVI HEALTH CARE</h2>
          <h3>Welcome!</h3>

          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <button type="submit" className="btn">Log-In</button>
          </form>
          <p className="or-text">or</p>
          {message && <p>{message}</p>}

          <p className="bottom-text">
            Don't have an account? <NavLink to="/register">Register</NavLink>
          </p>
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
