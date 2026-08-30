const express = require("express");
const router = express.Router();
const myListController = require("../controllers/mylist.controller");

router.get("/", myListController.getAllMyLists);
router.get("/:id", myListController.getMyListById);
router.post("/", myListController.createMyList);
router.delete("/:id", myListController.deleteMyList);

module.exports = router;
