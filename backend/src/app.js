const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Intergalactic Cargo Portal API");
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
