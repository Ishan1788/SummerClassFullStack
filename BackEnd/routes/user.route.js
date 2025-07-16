import { Router } from "express";
const router = Router();
import { allUsers } from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";

router.get("/list", authMiddleware, allUsers);

export default router;


