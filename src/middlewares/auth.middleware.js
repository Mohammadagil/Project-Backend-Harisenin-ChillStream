const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError("Token tidak ditemukan", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError("Token tidak valid atau sudah kadaluarsa", 401);
  }
}

module.exports = {
  verifyToken,
};
