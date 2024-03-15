import { Router } from "express";

const router = Router();

router.post("/new", (req, res) => {
  res.send("user created");
});

export default router;
