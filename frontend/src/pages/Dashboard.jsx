import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [cargo, setCargo] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h3>Role: {role}</h3>

      {role === "Admin" && (
        <div>
          <h3>Upload File</h3>
          <input type="file" id="manifestFile" />
          <button>Upload</button>
        </div>
      )}

      <table border="1">
        <thead>
          <tr>
            <th>Cargo ID</th>
            <th>Destination</th>
            <th>Weight</th>
          </tr>
        </thead>

        <tbody>
          {cargo.map((item) => (
            <tr key={item._id}>
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
    </div>
  );
}

export default Dashboard;
