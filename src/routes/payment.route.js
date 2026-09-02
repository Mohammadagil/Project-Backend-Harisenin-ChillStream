const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.post("/", paymentController.createPayment);
router.patch("/:id", paymentController.updatePayment);

module.exports = router;
