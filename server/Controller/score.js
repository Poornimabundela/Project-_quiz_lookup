import express from "express";
import ScoreController from "../controllers/score.js";

const router = express.Router();

// Example score route
router.post("/save", ScoreController.saveScore);

export default router;
