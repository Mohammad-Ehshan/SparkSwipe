import express from "express";
import { improveIdea } from "../controllers/aiController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/improve-idea", isAuthenticated, improveIdea);

export default router;