const prisma = require("../config/prisma");

async function getAllGenres() {
  return prisma.genre.findMany();
}

async function getGenreById(id) {
  return prisma.genre.findUnique({ where: { id } });
}

async function createGenre(data) {
  return prisma.genre.create({ data });
}

async function updateGenre(id, data) {
  return prisma.genre.update({ where: { id }, data });
}

async function deleteGenre(id) {
  return prisma.genre.delete({ where: { id } });
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};
