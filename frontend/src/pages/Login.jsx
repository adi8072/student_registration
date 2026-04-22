import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <input type="password" placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <button>Login</button>
        </form>

        <p><Link to="/register">Create account</Link></p>
      </div>
    </div>
  );
}

export default Login;