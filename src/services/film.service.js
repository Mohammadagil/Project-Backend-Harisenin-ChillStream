const prisma = require("../config/prisma");

async function getAllFilms() {
  return prisma.film.findMany({include: { genre: true }});
}

async function getFilmById(id) {
  return prisma.film.findUnique({ where: { id },  include: { genre: true } });
}

async function createFilm(data) {
  return prisma.film.create({ data });
}

async function updateFilm(id, data) {
  return prisma.film.update({ where: { id }, data });
}

async function deleteFilm(id) {
  return prisma.film.delete({ where: { id } });
}

module.exports = {
  getAllFilms,
  getFilmById,
  createFilm,
  updateFilm,
  deleteFilm,
};
