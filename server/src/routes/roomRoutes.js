const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const {
  createRoom,
  joinRoom,
  roomDetails
}
=
require(
"../controllers/roomController"
);

router.post(
  "/create",
  auth,
  createRoom
);

router.post(
  "/join",
  auth,
  joinRoom
);

router.post(
  "/details",
  auth,
  roomDetails
);

module.exports =
router;