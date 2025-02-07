import fs from "fs";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";

const validateFile = (file) => {
  if (!file) {
    throw new BadRequestError("Please provide an image");
  }
  const { originalname, path } = file;
  const parts = originalname.split(".");
  const extension = parts.at(-1);
  const newPath = path + "." + extension;

  fs.renameSync(path, newPath);
  return newPath;
};

const createPost = async (req, res) => {
  const newPath = validateFile(req.file);

  const { title, summary, content } = req.body;
  if (!title) {
    throw new BadRequestError("Please provide title");
  }

  if (!summary) {
    throw new BadRequestError("Please provide summary");
  }

  if (!content) {
    throw new BadRequestError("Please provide content");
  }

  const createdPost = await Post.create({
    title,
    summary,
    content,
    coverImg: newPath,
    author: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ createdPost });
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById({ _id: id }).populate("author", [
    "username",
  ]);

  if (!post) {
    throw new NotFoundError(`Post with ${id} doesn't exist`);
  }

  res.status(StatusCodes.OK).json({ post, user: req.user });
};

const getPosts = async (req, res) => {
  const data = await Post.find({})
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  if (!data) {
    throw NotFoundError("No Posts found");
  }

  res.status(StatusCodes.OK).json({ data });
};

const updatePost = async (req, res) => {
  const newFilePath = validateFile(req.file);
  const { postId, title, summary, content } = req.body;

  if (!title) {
    throw new BadRequestError("Please provide title");
  }

  if (!summary) {
    throw new BadRequestError("Please provide summary");
  }

  if (!content) {
    throw new BadRequestError("Please provide content");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      title,
      summary,
      content,
      coverImg: newFilePath,
      author: req.user.userId,
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ success: "ok" });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete({ _id: id });

  if (!post) {
    throw new NotFoundError(`No post with id ${id} found`);
  }

  res.status(StatusCodes.OK).json({ success: "ok" });
};

const like = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { likes: req.user.userId } },
    { new: true }
  );

  if (!updatedPost) {
    throw new BadRequestError(`No post with id ${id} found`);
  }

  res.status(StatusCodes.OK).json(updatedPost.likes);
};

const unlike = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: id },
    { $pull: { likes: req.user.userId } },
    { new: true }
  );

  if (!updatedPost) {
    throw new BadRequestError(`No post with id ${id} found`);
  }

  res.status(StatusCodes.OK).json(updatedPost.likes);
};
export { createPost, getPost, getPosts, updatePost, deletePost, like, unlike };
