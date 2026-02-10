import axios from "axios";
import type { Post, User, Comment, CreatePostPayload } from "@/types";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => api.get<Post[]>("/posts").then((r) => r.data);

export const getPost = (id: number) =>
  api.get<Post>(`/posts/${id}`).then((r) => r.data);

export const getUsers = () => api.get<User[]>("/users").then((r) => r.data);

export const getComments = (postId: number) =>
  api.get<Comment[]>(`/posts/${postId}/comments`).then((r) => r.data);

export const createPost = (data: CreatePostPayload) =>
  api.post<Post>("/posts", data).then((r) => r.data);
