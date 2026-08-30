const orderService = require("../services/order.service");
const { ApiError } = require("../utils/ApiError");

async function getAllOrders(req, res) {
  const userId = req.query.user_id ? BigInt(req.query.user_id) : undefined;
  const orders = await orderService.getAllOrders(userId);
  res.status(200).json({
    message: "Orders retrieved successfully",
    data: orders,
    status: "success",
  });
}

async function getOrderById(req, res) {
  const id = BigInt(req.params.id);
  const order = await orderService.getOrderById(id);
  if (!order) {
    throw new ApiError("Order not found", 404);
  }
  res.status(200).json({
    message: "Order retrieved successfully",
    data: order,
    status: "success",
  });
}

async function createOrder(req, res) {
  const { user_id, package_id, order_date, status } = req.body;
  const order = await orderService.createOrder({
    user_id,
    package_id,
    order_date: order_date ? new Date(order_date) : new Date(),
    status,
  });
  res.status(201).json({
    message: "Order created successfully",
    data: order,
    status: "success",
  });
}

async function updateOrder(req, res) {
  const id = BigInt(req.params.id);
  const existing = await orderService.getOrderById(id);
  if (!existing) {
    throw new ApiError("Order not found", 404);
  }
  const { user_id, package_id, order_date, status } = req.body;
  const order = await orderService.updateOrder(id, {
    user_id,
    package_id,
    order_date: order_date ? new Date(order_date) : undefined,
    status,
  });
  res.status(200).json({
    message: "Order updated successfully",
    data: order,
    status: "success",
  });
}

async function deleteOrder(req, res) {
  const id = BigInt(req.params.id);
  const existing = await orderService.getOrderById(id);
  if (!existing) {
    throw new ApiError("Order not found", 404);
  }
  await orderService.deleteOrder(id);
  res.status(200).json({
    message: "Order deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
