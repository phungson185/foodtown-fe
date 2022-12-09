import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL});
axios.defaults.withCredentials = true;

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const signUp = (formData) => API.post("/users/signup", formData);
export const login = (formData, isLoginAsAdmin) =>
  API.post(`/users/login?admin=${isLoginAsAdmin}`, formData);
export const logout = () => API.post("/users/logout");
export const getAllUsers = () => API.get("/users");
export const getUser = () => API.get("/users");

export const getProducts = (page, filterField, searchingName) =>
  API.get(
    `/products?page=${page}&limit=${4}&filter=${filterField}&name=${searchingName}`
  );
export const getFoodById = (id) => API.get(`/products/${id}`);
export const getFoodWithoutId = (id) => API.get(`/foods/findwithout/${id}`);
export const createProduct = (product) =>
  API.post(`/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProduct = (product) =>
  API.patch(`/products`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getBlogs = (page, filterField, searchingName) =>
  API.get(
    `blogs?page=${page}&limit=${6}&filter=${filterField}&name=${searchingName}`
  );
export const getBlog = (id) => API.get(`/blogs/${id}`);
export const getBlogById = (id) => API.get(`/blogs/${id}`);
export const getCommentBlogs = (blogId, page) =>
  API.get(`blogs/${blogId}/comments?page=${page}`);
export const createBlog = (blog) =>
  API.post("/blogs", blog, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateBlog = (blog) =>
  API.patch("./blogs", blog, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const likeBlog = (blogId) => API.patch(`./blogs/like/${blogId}`);
export const dislikeBlog = (blogId) => API.patch(`./blogs/dislike/${blogId}`);
export const deleteBlog = (blogId) => API.delete(`./blogs/${blogId}`);
export const commentBlog = (blogId, comment) =>
  API.patch(`./blogs/comment/${blogId}`, { comment });

export const getAllSponsors = () => API.get("/sponsors");

export const getAllOrdersByUser = () => API.get("/orders");
export const createOrder = (order) => API.post("/orders", order);
