import axios from 'axios';

export const getPostsRequests = async () => {
  return await axios.get('/posts');
}

export const createPostRequests = async (post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
  }
  return await axios.post('/post', form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const deletePostRequests = async (id) => {
  return await axios.delete('/posts/' + id);
}

export const getPostRequests = async (id) => {
  return await axios.get('/posts/' + id);
}

export const updatePostRequests = async (id, newPostFields) => {
  const form = new FormData();
  for (let key in newPostFields) {
    form.append(key, newPostFields[key]);
  }
  return axios.put("/posts/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};