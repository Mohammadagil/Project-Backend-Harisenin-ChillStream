const prisma = require("../config/prisma");

async function getAllPackages() {
  return prisma.package.findMany({ where: { is_active: true } });
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

async function deactivatePackage(id) {
  return prisma.package.update({ where: { id }, data: { is_active: false } });
}

async function countOrdersByPackageId(id) {
  return prisma.order.count({ where: { package_id: id } });
}

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deactivatePackage,
  countOrdersByPackageId,
};
