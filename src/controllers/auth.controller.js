const authService = require("../services/auth.service");
const { ApiError } = require("../utils/ApiError");

async function register(req, res) {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    throw new ApiError("name, username, email, dan password wajib diisi", 400);
  }

  try {
    await authService.registerUser({ name, username, email, password });
  } catch (error) {
    if (error.code === "USERNAME_EXISTS") {
      throw new ApiError("Username sudah terdaftar", 409);
    }
    throw error;
  }
  res.status(201).json({
    message: "Registrasi diproses. Jika email valid dan belum terdaftar, cek inbox untuk link verifikasi.",
    data: null,
    status: "success",
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("Email dan password wajib diisi", 400);
  }

  const token = await authService.loginUser({ email, password });
  if (!token) {
    throw new ApiError("Email atau password salah", 401);
  }

  res.status(200).json({
    message: "Login successful",
    data: { token },
    status: "success",
  });
}

async function verifyEmail(req, res) {
  const { token } = req.query;

  if (!token) {
    throw new ApiError("Invalid Verification Token", 400);
  }

  const user = await authService.verifyEmail(token);
  if (!user) {
    throw new ApiError("Invalid Verification Token", 400);
  }

  res.status(200).json({
    message: "Email Verified Successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  register,
  login,
  verifyEmail,
};
