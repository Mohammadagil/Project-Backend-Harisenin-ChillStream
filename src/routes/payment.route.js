const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, paymentController.getAllPayments);
router.get("/:id", verifyToken, paymentController.getPaymentById);
router.post("/", verifyToken, paymentController.createPayment);
router.post("/notification", paymentController.handleNotification);
router.patch("/:id", verifyToken, paymentController.updatePayment);

module.exports = router;
