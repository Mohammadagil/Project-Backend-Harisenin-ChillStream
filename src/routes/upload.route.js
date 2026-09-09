const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../middlewares/upload.middleware");
const uploadController = require("../controllers/upload.controller");
const { ApiError } = require("../utils/ApiError");

router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(new ApiError(err.message, 400));
    }
    if (err) {
      return next(err);
    }
    next();
  });
}, uploadController.uploadImage);

module.exports = router;