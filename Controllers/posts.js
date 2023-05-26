// const Post = require("../models/posts");
import Post from "../models/posts.js"
import User from "../models/User.js"

//-----------------CREATE----------------------------------------

export const createPost = async (req, res) => {
    
  try {
    console.log("posts")
    const { userId, description, picturePath } = req.body;
    console.log(req.body)
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath:req.file.filename,
      likes: {},
      comments: [],
    });
    await newPost.save();
    // const post = await Post.create(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
//-------------------READ-------------------
export const getFeedPosts = async (req, res) => {
  try {
    console.log("enter in post")
    const post = await Post.find();
    console.log(post)
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//-------------------UPDATE----------------------

export const likePost = async (req, res) => {
  console.log("like")
  console.log(req.body)
  try {
    const updatedPost =[]
    const { id } = req.params;
    const { loggedInUserId } = req.body;
    const post = await Post.findById(id);
    console.log("post",post)
    const isLiked = post.likes.get(loggedInUserId);
    console.log("like status",isLiked)
    if (isLiked) {
      post.likes.delete(loggedInUserId);
      post.save()
      
      console.log("post in if",post)
    } else {
      post.likes.set(loggedInUserId, true);
      post.save()
    }

    // const updatedPost = await Post.findByIdAndUpdate(
    //   id,
    //   { likes: post.likes },
    //   { new: true }
    // );
     console.log("res",post)
    res.status(200).json(post);
  } catch (err) {
    
    res.status(400).json({ message: err.message });
  }
};
