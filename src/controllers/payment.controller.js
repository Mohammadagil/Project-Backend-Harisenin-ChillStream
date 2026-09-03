const paymentService = require("../services/payment.service");
const orderService = require("../services/order.service");
const { snap, coreApi } = require("../config/midtrans");
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
  const { order_id } = req.body;

  const order = await orderService.getOrderById(BigInt(order_id));
  if (!order) {
    throw new ApiError("Order not found", 404);
  }

  const existingPayments = await paymentService.getAllPayments(BigInt(order_id));
  if (existingPayments.length > 0) {
    throw new ApiError("Payment for this order already exists", 409);
  }

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: order.id.toString(),
      gross_amount: Number(order.package.price),
    },
  });

  try {
    const payment = await paymentService.createPayment({ order_id, method: "midtrans", amount: order.package.price, status: "pending" });
    res.status(201).json({
      message: "Payment created successfully",
      data: {
        payment,
        snap_token: transaction.token,
        redirect_url: transaction.redirect_url,
      },
      status: "success",
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ApiError("Payment for this order already exists", 409);
    }
    throw error;
  }
}

async function updatePayment(req, res) {
  const id = BigInt(req.params.id);
  const existing = await paymentService.getPaymentById(id);
  if (!existing) {
    throw new ApiError("Payment not found", 404);
  }
  const { method } = req.body;
  const payment = await paymentService.updatePayment(id, { method });
  res.status(200).json({
    message: "Payment updated successfully",
    data: payment,
    status: "success",
  });
}

async function handleNotification(req, res) {
  let notification;
  try {
    notification = await coreApi.transaction.notification(req.body);
  } catch (error) {
    // transaksi test dari dashboard Midtrans / tidak ditemukan di sistem mereka - cukup diakui
    return res.status(200).json({
      message: "Notification acknowledged",
      data: null,
      status: "success",
    });
  }

  const orderId = notification.order_id;
  const transactionStatus = notification.transaction_status;
  const fraudStatus = notification.fraud_status;
  const paymentType = notification.payment_type;

  // notifikasi test dari dashboard Midtrans (order_id bukan angka) - cukup diakui, jangan diproses
  if (!/^\d+$/.test(orderId)) {
    return res.status(200).json({
      message: "Notification acknowledged",
      data: null,
      status: "success",
    });
  }

  let paymentStatus = "pending";
  let orderStatus = "pending";

  if (transactionStatus === "capture") {
    if (fraudStatus === "accept") {
      paymentStatus = "berhasil";
      orderStatus = "berhasil";
    }
  } else if (transactionStatus === "settlement") {
    paymentStatus = "berhasil";
    orderStatus = "berhasil";
  } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
    paymentStatus = "gagal";
    orderStatus = "dibatalkan";
  }

  const payments = await paymentService.getAllPayments(BigInt(orderId));
  const payment = payments[0];
  if (!payment) {
    // order valid formatnya tapi tidak ada di database kita - tetap ack supaya Midtrans tidak retry terus
    return res.status(200).json({
      message: "Notification acknowledged, order not found",
      data: null,
      status: "success",
    });
  }

  await paymentService.updatePayment(payment.id, { method: paymentType, status: paymentStatus });
  await orderService.updateOrder(BigInt(orderId), { status: orderStatus });

  res.status(200).json({
    message: "Notification processed successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  handleNotification,
};
