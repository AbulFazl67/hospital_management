import { useState } from "react";

const Login = () => {
  const [email, setemail] = useState(""); // email ko state me define kiya
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
        body: JSON.stringify({ email, password }), // email yahan pass kiya gaya
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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)} // email ko update kar rahe hain
        />
        <input
          type="test"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
