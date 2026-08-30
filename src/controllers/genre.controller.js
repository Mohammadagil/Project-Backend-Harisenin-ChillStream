const genreService = require("../services/genre.service");
const { ApiError } = require("../utils/ApiError");

async function getAllGenres(req, res) {
  const genres = await genreService.getAllGenres();
  res.status(200).json({
    message: "Genres retrieved successfully",
    data: genres,
    status: "success",
  });
}

async function getGenreById(req, res) {
  const id = Number(req.params.id);
  const genre = await genreService.getGenreById(id);
  if (!genre) {
    throw new ApiError("Genre not found", 404);
  }
  res.status(200).json({
    message: "Genre retrieved successfully",
    data: genre,
    status: "success",
  });
}

async function createGenre(req, res) {
  const { name } = req.body;
  const genre = await genreService.createGenre({ name });
  res.status(201).json({
    message: "Genre created successfully",
    data: genre,
    status: "success",
  });
}

async function updateGenre(req, res) {
  const id = Number(req.params.id);
  const existing = await genreService.getGenreById(id);
  if (!existing) {
    throw new ApiError("Genre not found", 404);
  }
  const { name } = req.body;
  const genre = await genreService.updateGenre(id, { name });
  res.status(200).json({
    message: "Genre updated successfully",
    data: genre,
    status: "success",
  });
}

async function deleteGenre(req, res) {
  const id = Number(req.params.id);
  const existing = await genreService.getGenreById(id);
  if (!existing) {
    throw new ApiError("Genre not found", 404);
  }
  await genreService.deleteGenre(id);
  res.status(200).json({
    message: "Genre deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
