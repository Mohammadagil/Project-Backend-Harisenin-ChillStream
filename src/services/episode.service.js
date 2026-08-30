const prisma = require("../config/prisma");

async function getAllEpisodes(filmId) {
  return prisma.episode.findMany({ where: filmId ? { film_id: filmId } : undefined });
}

async function getEpisodeById(id) {
  return prisma.episode.findUnique({ where: { id } });
}

async function createEpisode(data) {
  return prisma.episode.create({ data });
}

async function updateEpisode(id, data) {
  return prisma.episode.update({ where: { id }, data });
}

async function deleteEpisode(id) {
  return prisma.episode.delete({ where: { id } });
}

module.exports = {
  getAllEpisodes,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
};
