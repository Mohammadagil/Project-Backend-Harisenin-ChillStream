const express = require("express");
const router = express.Router();
const filmController = require("../controllers/film.controller");

router.get("/", filmController.getAllFilms);
router.get("/:id", filmController.getFilmById);
router.post("/", filmController.createFilm);
router.patch("/:id", filmController.updateFilm);
router.delete("/:id", filmController.deleteFilm);

module.exports = router;
