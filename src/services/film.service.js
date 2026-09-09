const prisma = require("../config/prisma");

async function getAllFilms(query = {}) {
  const { genre_id, access_type, content_type, search, sort_by, order } = query;

  const where = {};
  if (genre_id) where.genre_id = Number(genre_id);
  if (access_type !== undefined) where.access_type = Number(access_type);
  if (content_type !== undefined) where.content_type = Number(content_type);
  if (search) where.title = { contains: search };

  const allowedSortFields = ["title", "release_year", "id"];
  const sortField = allowedSortFields.includes(sort_by) ? sort_by : "id";
  const sortOrder = order === "desc" ? "desc" : "asc";
  
  return prisma.film.findMany({ 
    where,
    orderBy: { [sortField]: sortOrder },
    include: { genre: true },
   });
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
