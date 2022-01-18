const express = require("express");
const { ActivityController } = require("../controllers");

const router = express.Router();

router.get("/", ActivityController.getAllActivity);

router.get("/:id", ActivityController.getOneActivity);

router.post("/", ActivityController.createActivity);

router.patch("/:id", ActivityController.updateActivity);

router.delete("/:id", ActivityController.deleteActivity);

module.exports = router;
