import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back 👋</h1>

          <p>Sign in to manage your intergalactic cargo operations.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
