const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.use(verifyToken);

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.patch("/:id", orderController.updateOrder);

module.exports = router;
