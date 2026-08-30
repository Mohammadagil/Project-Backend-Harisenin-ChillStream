const packageService = require("../services/package.service");
const { ApiError } = require("../utils/ApiError");

async function getAllPackages(req, res) {
  const packages = await packageService.getAllPackages();
  res.status(200).json({
    message: "Packages retrieved successfully",
    data: packages,
    status: "success",
  });
}

async function getPackageById(req, res) {
  const id = Number(req.params.id);
  const packageData = await packageService.getPackageById(id);
  if (!packageData) {
    throw new ApiError("Package not found", 404);
  }
  res.status(200).json({
    message: "Package retrieved successfully",
    data: packageData,
    status: "success",
  });
}

async function createPackage(req, res) {
  const { name, price, duration } = req.body;
  const packageData = await packageService.createPackage({ name, price, duration });
  res.status(201).json({
    message: "Package created successfully",
    data: packageData,
    status: "success",
  });
}

async function updatePackage(req, res) {
  const id = Number(req.params.id);
  const existing = await packageService.getPackageById(id);
  if (!existing) {
    throw new ApiError("Package not found", 404);
  }
  const { name, price, duration } = req.body;
  const packageData = await packageService.updatePackage(id, { name, price, duration });
  res.status(200).json({
    message: "Package updated successfully",
    data: packageData,
    status: "success",
  });
}

async function deletePackage(req, res) {
  const id = Number(req.params.id);
  const existing = await packageService.getPackageById(id);
  if (!existing) {
    throw new ApiError("Package not found", 404);
  }
  await packageService.deletePackage(id);
  res.status(200).json({
    message: "Package deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
