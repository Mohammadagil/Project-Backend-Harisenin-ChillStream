const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const SALT_ROUNDS = 10;

async function registerUser({ name, username, email, password }) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: { name, username, email, password: hashedPassword },
  });
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  return jwt.sign({ id: user.id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

module.exports = {
  registerUser,
  loginUser,
};