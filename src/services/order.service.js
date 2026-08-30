const prisma = require("../config/prisma");

async function getAllOrders(userId) {
  return prisma.order.findMany({ where: userId ? { user_id: userId } : undefined });
}

async function getOrderById(id) {
  return prisma.order.findUnique({ where: { id } });
}

async function createOrder(data) {
  return prisma.order.create({ data });
}

async function updateOrder(id, data) {
  return prisma.order.update({ where: { id }, data });
}

async function deleteOrder(id) {
  return prisma.order.delete({ where: { id } });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
