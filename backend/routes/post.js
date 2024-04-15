import { Router } from "express";
const router = Router();
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/post.js";

import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

import authorizationMiddleware from "../middleware/auth.js";

router
  .route("/")
  .post(uploadMiddleware.single("file"), createPost)
  .get(getPosts);

router
  .route("/:id")
  .get(getPost)
  .patch(uploadMiddleware.single("file"), updatePost)
  .delete(deletePost);

export default router;
