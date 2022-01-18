const express = require("express");
const { TodoController } = require("../controllers");

const router = express.Router();

router.get("/", TodoController.getAllTodo);

router.get("/:id", TodoController.getOneTodo);

router.post("/", TodoController.createTodo);

router.patch("/:id", TodoController.updateTodo);

router.delete("/:id", TodoController.deleteTodo);

module.exports = router;