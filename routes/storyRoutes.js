import express from "express";
import {
  bookmarkStoriesController,
  getStoriesByIdController,
  getStoriesController,
} from "../controllers/storyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStoriesController);
router.get("/:id", getStoriesByIdController);
router.post("/:id/bookmark", authMiddleware, bookmarkStoriesController);

export default router;
