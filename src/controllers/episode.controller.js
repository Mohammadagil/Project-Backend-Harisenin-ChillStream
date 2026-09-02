const episodeService = require("../services/episode.service");
const { ApiError } = require("../utils/ApiError");

async function getAllEpisodes(req, res) {
  const filmId = req.query.film_id ? BigInt(req.query.film_id) : undefined;
  const episodes = await episodeService.getAllEpisodes(filmId);
  res.status(200).json({
    message: "Episodes retrieved successfully",
    data: episodes,
    status: "success",
  });
}

async function getEpisodeById(req, res) {
  const id = BigInt(req.params.id);
  const episode = await episodeService.getEpisodeById(id);
  if (!episode) {
    throw new ApiError("Episode not found", 404);
  }
  res.status(200).json({
    message: "Episode retrieved successfully",
    data: episode,
    status: "success",
  });
}

async function createEpisode(req, res) {
  const { film_id, title, duration, url_video, episode_number } = req.body;
  try {
    const episode = await episodeService.createEpisode({ film_id, title, duration, url_video, episode_number });
    res.status(201).json({
      message: "Episode created successfully",
      data: episode,
      status: "success",
    });
  } catch (error) {
    if (error.code === "P2003") {
      throw new ApiError("Film not found", 400);
    }
    throw error;
  }
}

async function updateEpisode(req, res) {
  const id = BigInt(req.params.id);
  const existing = await episodeService.getEpisodeById(id);
  if (!existing) {
    throw new ApiError("Episode not found", 404);
  }
  const { film_id, title, duration, url_video, episode_number } = req.body;
  try {
    const episode = await episodeService.updateEpisode(id, { film_id, title, duration, url_video, episode_number });
    res.status(200).json({
      message: "Episode updated successfully",
      data: episode,
      status: "success",
    });
  } catch (error) {
    if (error.code === "P2003") {
      throw new ApiError("Film not found", 400);
    }
    throw error;
  }
}

async function deleteEpisode(req, res) {
  const id = BigInt(req.params.id);
  const existing = await episodeService.getEpisodeById(id);
  if (!existing) {
    throw new ApiError("Episode not found", 404);
  }
  await episodeService.deleteEpisode(id);
  res.status(200).json({
    message: "Episode deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllEpisodes,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
};
