const authorizeAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Clearance level inadequate.",
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Clearance level inadequate.",
    });
  }
};

module.exports = authorizeAdmin;
