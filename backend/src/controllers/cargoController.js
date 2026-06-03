const fs = require("fs");

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

const uploadManifest = async (req, res) => {
  try {
    const filePath = req.file.path;

    const fileContent = fs.readFileSync(filePath, "utf8");

    const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

    const parsedRecords = lines.map(parseLine).filter(Boolean);

    res.status(200).json({
      totalRecords: parsedRecords.length,
      parsedRecords,
    });

    res.status(200).json({
      totalRecords: lines.length,
      lines,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  uploadManifest,
};
