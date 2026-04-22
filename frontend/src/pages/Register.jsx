import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <input type="password" placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <button>Register</button>
        </form>

        <p><Link to="/">Back to login</Link></p>
      </div>
    </div>
  );
}

export default Register;