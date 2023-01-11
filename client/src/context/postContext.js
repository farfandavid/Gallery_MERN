import { useState, createContext, useContext, useEffect } from "react"
import {
  createPostRequests,
  deletePostRequests,
  getPostRequests,
  getPostsRequests,
  updatePostRequests
} from "../api/posts";

const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
}

export const PostProvider = ({ children }) => {

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequests();
    setPosts(res.data);
  }

  const createPost = async (post) => {
    try {
      const res = await createPostRequests(post);
      //console.log(res);
      setPosts([...posts, res.data]);
    } catch (error) {
      console.error(error);
    }

  }

  const deletePost = async (id) => {
    await deletePostRequests(id);
    setPosts(posts.filter(post => post._id !== id));
    //setPosts([...posts, res.data]);
  }

  const getPost = async (id) => {
    const res = await getPostRequests(id);
    return res.data;
  }

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequests(id, post);
      setPosts(posts.map((post) => (post._id === id ? res.data : post)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(posts);
  return <postContext.Provider value={
    {
      posts,
      getPosts,
      createPost,
      deletePost,
      getPost,
      updatePost
    }
  }>
    {children || ''}
  </postContext.Provider>
}