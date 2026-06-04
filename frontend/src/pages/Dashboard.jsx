import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsContainer from "../components/StatsContainer";

function Dashboard() {
  const navigate = useNavigate();
  const [cargo, setCargo] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchCargo();
  }, []);

  const fetchCargo = async () => {
    try {
      const response = await api.get("/cargo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let records = response.data;

      records.sort((a, b) => {
        if (a.destination === "Earth") return 1;
        if (b.destination === "Earth") return -1;
        return b.weight - a.weight;
      });

      setCargo(records);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("manifest", file);

      const response = await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Manifest uploaded successfully 🚀");
      fetchCargo();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully 👋");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="dashboard-container">
      <Navbar role={role} handleLogout={handleLogout} />
      <HeroSection />
      <StatsContainer cargo={cargo} role={role} />

      {/* Cargo Section */}
      <div className="cargo-card">
        <div className="cargo-header">
          <div>
            <h2>Cargo Manifest</h2>
            <p>All intergalactic cargo shipments</p>
          </div>

          {role === "Admin" && (
            <div className="upload-section">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button
                className="upload-btn"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          )}
        </div>

        {cargo.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>

            <h3>No Cargo Records Found</h3>

            <p>
              Upload a manifest file to start managing intergalactic cargo
              shipments.
            </p>
          </div>
        ) : (
          <table className="cargo-table">
            <thead>
              <tr>
                <th>Cargo ID</th>
                <th>Destination</th>
                <th>Weight</th>
              </tr>
            </thead>

            <tbody>
              {cargo.map((item) => (
                <tr
                  key={item._id}
                  className={item.destination === "Earth" ? "earth-row" : ""}
                >
                  <td>{item.cargoId}</td>
                  <td>{item.destination}</td>
                  <td>
                    {role === "Admin"
                      ? `${item.weight} KG`
                      : `${(item.weight * 2.20462).toFixed(2)} LBS`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
