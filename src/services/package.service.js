const prisma = require("../config/prisma");

async function getAllPackages() {
  return prisma.package.findMany();
}

async function getPackageById(id) {
  return prisma.package.findUnique({ where: { id } });
}

async function createPackage(data) {
  return prisma.package.create({ data });
}

async function updatePackage(id, data) {
  return prisma.package.update({ where: { id }, data });
}

async function deletePackage(id) {
  return prisma.package.delete({ where: { id } });
}

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
