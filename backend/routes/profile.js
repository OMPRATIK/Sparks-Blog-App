import { Router } from "express";
import profileController from "../controllers/profile.js";

const router = Router();

router.route("/").get(profileController);

export default router;
