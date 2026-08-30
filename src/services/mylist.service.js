const prisma = require("../config/prisma");

async function getAllMyLists(userId) {
  return prisma.myList.findMany({ where: userId ? { user_id: userId } : undefined });
}

async function getMyListById(id) {
  return prisma.myList.findUnique({ where: { id } });
}

async function createMyList(data) {
  return prisma.myList.create({ data });
}

async function deleteMyList(id) {
  return prisma.myList.delete({ where: { id } });
}

module.exports = {
  getAllMyLists,
  getMyListById,
  createMyList,
  deleteMyList,
};
