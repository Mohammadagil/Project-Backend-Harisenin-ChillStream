const express = require("express");
const router = express.Router();
const packageController = require("../controllers/package.controller");

router.get("/", packageController.getAllPackages);
router.get("/:id", packageController.getPackageById);
router.post("/", packageController.createPackage);
router.patch("/:id", packageController.updatePackage);
router.delete("/:id", packageController.deletePackage);

module.exports = router;
