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

  const pendingCount = await orderService.countPendingOrdersByUserId(user_id);
  if (pendingCount > 0) {
    throw new ApiError("Anda masih memiliki order pending, selesaikan atau batalkan terlebih dahulu sebelum order baru", 409);
  }
  try {
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
  } catch (error) {
    if (error.code === "P2003") {
      throw new ApiError("User or Package not found", 400);
    }
    throw error;
  }
}

async function updateOrder(req, res) {
  const id = BigInt(req.params.id);
  const existing = await orderService.getOrderById(id);
  if (!existing) {
    throw new ApiError("Order not found", 404);
  }
  const { user_id, package_id, order_date, status } = req.body;
  try {
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
  } catch (error) {
    if (error.code === "P2003") {
      throw new ApiError("User or Package not found", 400);
    }
    throw error;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
