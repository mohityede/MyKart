import { Router } from "express";
import { createUser, getUser } from "../controllers/user.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const router = Router();

router.get("/", asyncWrapper(getUser));
router.post("/new", asyncWrapper(createUser));

export default router;
