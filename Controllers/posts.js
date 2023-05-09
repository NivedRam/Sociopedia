// const Post = require("../models/posts");
import Post from "../models/posts.js"

//-----------------CREATE----------------------------------------

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await user.findById(userId);
    const newPost = new post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: {},
    });
    await newPost.save();
    const post = await post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//-------------------READ-------------------
export const getFeedPosts = async (req, res) => {
  try {
    const post = await post.find();
    req.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await post.find({ userId });
    req.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//-------------------UPDATE----------------------

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json();
  } catch (err) {
    32;
    res.status(400).json({ message: err.message });
  }
};
