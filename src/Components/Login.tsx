import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (user) {
      // ✅ ONLY use context (no direct localStorage usage here)
      login({
        name: user.name,
        email: user.email,
      });

      alert(`Welcome ${user.name}`);

      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: "300px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button type="submit">Login</button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
