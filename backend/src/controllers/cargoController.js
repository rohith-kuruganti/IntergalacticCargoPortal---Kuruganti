const fs = require("fs");

const uploadManifest = async (req, res) => {
  try {
    const filePath = req.file.path;

    const fileContent = fs.readFileSync(filePath, "utf8");

    const lines = fileContent.split("\n").filter((line) => line.trim() !== "");

    console.log(lines);

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
