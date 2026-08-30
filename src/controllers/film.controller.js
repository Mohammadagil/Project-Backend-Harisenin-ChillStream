const filmService = require("../services/film.service");
const { ApiError } = require("../utils/ApiError");

async function getAllFilms(req, res) {
  const films = await filmService.getAllFilms();
  res.status(200).json({
    message: "Films retrieved successfully",
    data: films,
    status: "success",
  });
}

async function getFilmById(req, res) {
  const id = BigInt(req.params.id);
  const film = await filmService.getFilmById(id);
  if (!film) {
    throw new ApiError("Film not found", 404);
  }
  res.status(200).json({
    message: "Film retrieved successfully",
    data: film,
    status: "success",
  });
}

async function createFilm(req, res) {
  const { genre_id, description, poster, release_year, access_type, content_type, title } = req.body;
  const film = await filmService.createFilm({genre_id, description, poster, release_year, access_type, content_type, title});
  res.status(201).json({
    message: "Film created successfully",
    data: film,
    status: "success",
  });
}

async function updateFilm(req, res) {
  const id = BigInt(req.params.id);
  const existing = await filmService.getFilmById(id);
  if (!existing) {
    throw new ApiError("Film not found", 404);
  }
  const { genre_id, description, poster, release_year, access_type, content_type, title } = req.body;
  const film = await filmService.updateFilm(id, { genre_id, description, poster, release_year, access_type, content_type, title });
  res.status(200).json({
    message: "Film updated successfully",
    data: film,
    status: "success",
  });
}

async function deleteFilm(req, res) {
  const id = BigInt(req.params.id);
  const existing = await filmService.getFilmById(id);
  if (!existing) {
    throw new ApiError("Film not found", 404);
  }
  await filmService.deleteFilm(id);
  res.status(200).json({
    message: "Film deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
};
