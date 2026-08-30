const paymentService = require("../services/payment.service");
const { ApiError } = require("../utils/ApiError");

async function getAllPayments(req, res) {
  const orderId = req.query.order_id ? BigInt(req.query.order_id) : undefined;
  const payments = await paymentService.getAllPayments(orderId);
  res.status(200).json({
    message: "Payments retrieved successfully",
    data: payments,
    status: "success",
  });
}

async function getPaymentById(req, res) {
  const id = BigInt(req.params.id);
  const payment = await paymentService.getPaymentById(id);
  if (!payment) {
    throw new ApiError("Payment not found", 404);
  }
  res.status(200).json({
    message: "Payment retrieved successfully",
    data: payment,
    status: "success",
  });
}

async function createPayment(req, res) {
  const { order_id, method, amount, status } = req.body;
  const payment = await paymentService.createPayment({ order_id, method, amount, status });
  res.status(201).json({
    message: "Payment created successfully",
    data: payment,
    status: "success",
  });
}

async function updatePayment(req, res) {
  const id = BigInt(req.params.id);
  const existing = await paymentService.getPaymentById(id);
  if (!existing) {
    throw new ApiError("Payment not found", 404);
  }
  const { order_id, method, amount, status } = req.body;
  const payment = await paymentService.updatePayment(id, { order_id, method, amount, status });
  res.status(200).json({
    message: "Payment updated successfully",
    data: payment,
    status: "success",
  });
}

async function deletePayment(req, res) {
  const id = BigInt(req.params.id);
  const existing = await paymentService.getPaymentById(id);
  if (!existing) {
    throw new ApiError("Payment not found", 404);
  }
  await paymentService.deletePayment(id);
  res.status(200).json({
    message: "Payment deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
