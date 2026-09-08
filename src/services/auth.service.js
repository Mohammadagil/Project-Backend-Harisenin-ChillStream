const bcrypt = require("bcrypt")
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

module.exports = {
  registerUser,
};