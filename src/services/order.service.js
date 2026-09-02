const prisma = require("../config/prisma");

const PENDING_EXPIRY_HOURS = 24;

async function expiredOldPendingOrders(where) {
  const expiryThreshold = new Date(Date.now() - PENDING_EXPIRY_HOURS * 60 * 60 * 1000);
  await prisma.order.updateMany({
    where: {
      ...where,
      status: "pending",
      order_date: { lt: expiryThreshold },
    },
    data: { status: "dibatalkan" },
  });
}

async function getAllOrders(userId) {
  await expiredOldPendingOrders(userId ? { user_id: userId } : {});
  return prisma.order.findMany({ where: userId ? { user_id: userId } : undefined });
}

async function getOrderById(id) {
  await expiredOldPendingOrders({ id });
  return prisma.order.findUnique({ where: { id }, include: { package: true } });
}

async function createOrder(data) {
  return prisma.order.create({ data });
}

async function updateOrder(id, data) {
  return prisma.order.update({ where: { id }, data });
}

async function countPendingOrdersByUserId(userId) {
  return prisma.order.count({ where: { user_id: userId, status: "pending" } });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  countPendingOrdersByUserId,
};
