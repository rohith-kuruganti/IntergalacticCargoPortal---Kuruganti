function HeroSection() {
  return (
    <div className="hero-top">
      <div className="welcome-section">
        <h1>Welcome back 👋</h1>

        <h6 className="hero-heading">Manage cargo</h6>

        <p>
          Upload manifests, monitor shipments, and track cargo operations in one
          place.
        </p>
      </div>

      <div className="date-card">
        <h4>{new Date().toLocaleDateString()}</h4>

        <p>
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
