const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../config/mailer");

const SALT_ROUNDS = 10;

async function registerUser({ name, username, email, password }) {
  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) {
    const error = new Error("Username sudah terdaftar");
    error.code = "USERNAME_EXISTS";
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return;
  }

  const verificationToken = uuidv4();

  try {
    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword, verification_token: verificationToken },
    });

    await sendVerificationEmail(user.email, verificationToken);
  } catch (error) {
    if (error.code === "P2002") {
      return;
    }
    throw error;
  }
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

async function verifyEmail(token) {
  const user = await prisma.user.findUnique({ where: { verification_token: token } });
  if (!user) {
    return null;
  }

  return prisma.user.update({
    where: { id: user.id },
    data: { is_verified: true, verification_token: null },
  });
}

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};
