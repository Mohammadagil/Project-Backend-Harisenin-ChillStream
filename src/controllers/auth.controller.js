const authService = require("../services/auth.service");
const { ApiError } = require("../utils/ApiError");

async function register(req, res) {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError("name, username, email, dan password wajib diisi", 400);
  }

  try {
    const user = await authService.registerUser({ name, username, email, password });
    res.status(201).json({
      message: "User registered successfully",
      data: user,
      status: "success",
    });
  } catch (error) {
    if (error.code === "P2002") {
      const target = String(error.meta?.target ?? "");
      const field = target.includes("email") ? "email" : target.includes("username") ? "username" : "data";
      throw new ApiError(`${field} sudah terdaftar`, 409);
    }
    throw error;
  }
}

module.exports = {
  register,
};
