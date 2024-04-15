import { Router } from "express";
const router = Router();
import {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  like,
  unlike,
} from "../controllers/post.js";

import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

router
  .route("/")
  .post(uploadMiddleware.single("file"), createPost)
  .get(getPosts);

router
  .route("/:id")
  .get(getPost)
  .patch(uploadMiddleware.single("file"), updatePost)
  .delete(deletePost);

router.route("/:id/like").patch(like);
router.route("/:id/unlike").patch(unlike);

export default router;
