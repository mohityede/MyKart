import { Router } from "express";
import { createUser, getUser } from "../controllers/user.js";

const router = Router();

router.get("/", getUser);
router.post("/new", createUser);

export default router;
