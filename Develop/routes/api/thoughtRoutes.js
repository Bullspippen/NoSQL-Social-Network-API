const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController.js");

const {
  addReaction,
  deleteReaction,
} = require("../../controllers/reactionController.js");

const Thought = require("../../models/Thought");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:thoughtId").get(getThoughtById);

  // Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
.route("/:thoughtId").put(updateThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:thoughtId/").delete(deleteThought);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// Set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
