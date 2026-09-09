const { ApiError } = require("../utils/ApiError");

function uploadImage(req, res) {
  if (!req.file) {
    throw new ApiError("File gambar wajib diupload", 400);
  }

  res.status(201).json({
    message: "File uploaded successfully",
    data: {
      filename: req.file.filename,
      url: `${process.env.APP_URL}/uploads/${req.file.filename}`,
    },
    status: "success",
  });
}

module.exports = {
  uploadImage,
};
