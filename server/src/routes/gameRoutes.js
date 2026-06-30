const express = require("express");

const router = express.Router();

const {
  getGameDetails,
} = require("../controllers/gameController");

router.post(
  "/details",
  getGameDetails
);

module.exports = router;