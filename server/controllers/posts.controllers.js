import Post from '../models/Post.js'
import { updloadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
  try {
    //throw new Error('my new error!!!');
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;
    // Si req file existe e image existe
    if (req.files?.image) {
      const result = await updloadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      //console.log(result);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }

    }
    const newPost = new Post({ title, description, image });
    //console.log(newPost);
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

/* export const updatePost = async (req, res) => {
  try {
    const updatedPosts = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    //const post = await Post.updateOne({ _id: req.params.id }, req.body, { new: true });
    //console.log(post);
    return res.send(updatedPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
} */

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    let image
    // TODO: validate req.body before to update

    // if a new image is uploaded upload it to cloudinary
    if (req.files?.image) {
      // delete old image
      const oldPost = await Post.findById(id);
      if (oldPost.image.public_id) {
        await deleteImage(oldPost.image.public_id);
      }
      const result = await updloadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      //console.log(result);
      image = {
        url: result.secure_url,
        public_id: result.public_id
      }

    }
    /*  const updatedPost = await Post.findByIdAndUpdate(
       id,
       { $set: req.body },
       {
         new: true,
       }
     ); */

    const updatedPosts = await Post.findByIdAndUpdate(id,
      {

        $set: {
          title: req.body.title,
          description: req.body.description,
          image: image
        }

      }
      , { new: true });

    return res.json(updatedPosts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postRomoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRomoved) return res.sendStatus(404);
    //console.log(postRomoved);
    if (postRomoved.image.public_id) {
      await deleteImage(postRomoved.image.public_id);
    }

    //console.log(post);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}