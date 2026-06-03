const mongoose = require("mongoose");

const cargoSchema = new mongoose.Schema(
  {
    cargoId: {
      type: String,
      required: true,
    },
    manifestDate: {
      type: Date,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cargo", cargoSchema);
