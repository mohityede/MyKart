import { Router } from "express";

import asyncWrapper from "../utils/asyncWrapper.js";
import isAdmin from "../middlewares/checkAdmin.js";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/user.js";

const router = Router();

// get all user - GET /api/v1/user/all
router.get("/all", asyncWrapper(isAdmin), asyncWrapper(getAllUsers));
// get user by id - GET /api/v1/user/:id
router.get("/:id", asyncWrapper(getUser));

// create new user - POST /api/v1/user/new
router.post("/new", asyncWrapper(createUser));

// delete user - DELETE /api/v1/user/:id
router.delete("/:id", asyncWrapper(isAdmin), asyncWrapper(deleteUser));

export default router;
