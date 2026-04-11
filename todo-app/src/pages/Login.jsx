import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Signup from "./Signup";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignup, setShowSignup] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("https://todo-sawh.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message);
      return;
    }

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);
    login(data.token, data.user);
  }

  if (showSignup) {
    return <Signup goToLogin={() => setShowSignup(false)} />;
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth-btn" type="submit">
          Login
        </button>
        <p className="auth-switch">
          Don't have an account?
          <span onClick={() => setShowSignup(true)}>Signup</span>
        </p>
      </form>
    </div>
  );
}
