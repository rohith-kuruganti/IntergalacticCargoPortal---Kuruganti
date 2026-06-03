const fs = require("fs");
const Cargo = require("../models/Cargo");

const parseLine = (line) => {
  const regex = /\[(.*?)\]\s*\|\|\s*(.*?)\s*::\s*(\d+)\s*>>\s*(.*)/;

  const match = line.match(regex);
  console.log("match", match);

  if (!match) {
    return null;
  }

  return {
    manifestDate: match[1],
    cargoId: match[2],
    weight: Number(match[3]),
    destination: match[4],
  };
};

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const uploadManifest = async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");
    const lines = fileContent.split("\n").filter((line) => line.trim() !== "");
    const parsedRecords = lines.map(parseLine).filter(Boolean);
    const processedRecords = parsedRecords
      .map((record) => {
        let weight = record.weight;
        if (record.destination.includes("Sector-7")) {
          weight = weight * 1.45;
        }
        weight = Math.round(weight);
        return {
          ...record,
          weight,
        };
      })
      .filter((record) => !isPrime(record.weight));

    await Cargo.insertMany(
      processedRecords.map((record) => ({
        cargoId: record.cargoId,
        manifestDate: new Date(record.manifestDate),
        destination: record.destination,
        weight: record.weight,
      }))
    );

    res.status(200).json({
      message: "Records saved to database successfully...",
      recordsSaved: processedRecords.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getCargo = async (req, res) => {
  try {
    const cargo = await Cargo.find();
    res.status(200).json(cargo);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  uploadManifest,
  getCargo,
};
