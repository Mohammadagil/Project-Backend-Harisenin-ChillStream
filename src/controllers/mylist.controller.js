const myListService = require("../services/mylist.service");
const { ApiError } = require("../utils/ApiError");

async function getAllMyLists(req, res) {
  const userId = req.query.user_id ? BigInt(req.query.user_id) : undefined;
  const myLists = await myListService.getAllMyLists(userId);
  res.status(200).json({
    message: "MyLists retrieved successfully",
    data: myLists,
    status: "success",
  });
}

async function getMyListById(req, res) {
  const id = BigInt(req.params.id);
  const myList = await myListService.getMyListById(id);
  if (!myList) {
    throw new ApiError("MyList not found", 404);
  }
  res.status(200).json({
    message: "MyList retrieved successfully",
    data: myList,
    status: "success",
  });
}

async function createMyList(req, res) {
  const { user_id, film_id, date_added } = req.body;
  try {
    const myList = await myListService.createMyList({
      user_id,
      film_id,
      date_added: date_added ? new Date(date_added) : new Date(),
    });
    res.status(201).json({
      message: "MyList created successfully",
      data: myList,
      status: "success",
    });
  } catch (error) {
    if (error.code === "P2002") {
      throw new ApiError("Film already exist in watchlist", 409);
    }
    if (error.code === "P2003") {
      throw new ApiError("User or Film not found", 400);
    }
    throw error;
  }
}

async function deleteMyList(req, res) {
  const id = BigInt(req.params.id);
  const existing = await myListService.getMyListById(id);
  if (!existing) {
    throw new ApiError("MyList not found", 404);
  }
  await myListService.deleteMyList(id);
  res.status(200).json({
    message: "MyList deleted successfully",
    data: null,
    status: "success",
  });
}

module.exports = {
  getAllMyLists,
  getMyListById,
  createMyList,
  deleteMyList,
};
