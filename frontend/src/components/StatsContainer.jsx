function StatsContainer({ cargo, role }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Cargo</h3>
        <h2>{cargo.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Weight</h3>
        <h2>
          {cargo.reduce((sum, item) => sum + item.weight, 0)}
          <span style={{ fontSize: "20px", paddingLeft: "2px" }}>{`${
            role === "Admin" ? "KG" : "LBS"
          } `}</span>
        </h2>
      </div>

      <div className="stat-card">
        <h3>Destinations</h3>
        <h2>{new Set(cargo.map((item) => item.destination)).size}</h2>
      </div>
    </div>
  );
}

export default StatsContainer;
