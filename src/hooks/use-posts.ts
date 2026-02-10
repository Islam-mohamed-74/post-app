import { useQuery, useMutation } from "@tanstack/react-query";
import { getPosts, getPost, getUsers, getComments, createPost } from "@/services/api";
import type { CreatePostPayload } from "@/types";

export const usePosts = () =>
  useQuery({ queryKey: ["posts"], queryFn: getPosts });

export const usePost = (id: number) =>
  useQuery({ queryKey: ["posts", id], queryFn: () => getPost(id) });

export const useUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: getUsers });

export const useComments = (postId: number) =>
  useQuery({ queryKey: ["comments", postId], queryFn: () => getComments(postId) });

export const useCreatePost = () =>
  useMutation({ mutationFn: (data: CreatePostPayload) => createPost(data) });
