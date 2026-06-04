import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/signup", formData);
      toast.success("Account created successfully 🚀");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="portal-badge">Intergalactic Cargo Portal</div>

          <h1>Create Account 🚀</h1>

          <p>
            Join the portal and start managing intergalactic cargo operations.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a password"
              onChange={handleChange}
            />
          </div>

          <button className="auth-btn" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
