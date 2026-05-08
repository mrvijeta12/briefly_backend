import express from "express";
import { scraperController } from "../controllers/scraperController.js";
const router = express.Router();

router.post("/", scraperController);

export default router;
