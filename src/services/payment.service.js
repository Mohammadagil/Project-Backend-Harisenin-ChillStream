const prisma = require("../config/prisma");

async function getAllPayments(orderId) {
  return prisma.payment.findMany({ where: orderId ? { order_id: orderId } : undefined });
}

async function getPaymentById(id) {
  return prisma.payment.findUnique({ where: { id } });
}

async function createPayment(data) {
  return prisma.payment.create({ data });
}

async function updatePayment(id, data) {
  return prisma.payment.update({ where: { id }, data });
}

async function deletePayment(id) {
  return prisma.payment.delete({ where: { id } });
}

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
