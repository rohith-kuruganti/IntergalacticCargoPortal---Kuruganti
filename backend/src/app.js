const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const cargoRoutes = require("./routes/cargoRoutes");
const cors = require("cors");

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", cargoRoutes);

app.get("/", (req, res) => {
  res.send("Intergalactic Cargo Portal API");
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
