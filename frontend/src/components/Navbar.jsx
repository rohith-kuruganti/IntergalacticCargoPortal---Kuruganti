import { toast } from "react-toastify";

function Navbar({ role, handleLogout }) {
  return (
    <div className="navbar">
      <div className="logo-section">
        <h2>Intergalactic Cargo Portal</h2>
      </div>

      <div className="navbar-right">
        <span className="role-badge">
          {role === "Admin" ? "👤 Admin" : "👤 Standard"}
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
