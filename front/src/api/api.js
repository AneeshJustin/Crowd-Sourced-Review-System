import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  reducerPath: "review-system",
  tagTypes: ["Movies", "Reviews"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: (category) => ({
        url: '/posts',
        params: category ? { category } : undefined,
      }),
      providesTags: ["Movies"],
    }),
    addReview: build.mutation({
      query: (review) => ({
        url: '/reviews',
        method: 'POST',
        body: review,
      }),
      invalidatesTags: (result, error, { postId }) => [{ type: "Reviews", id: postId }],
    }),
    getReviewsByPost: build.query({
      query: (postId) => `/reviews/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Reviews", id: postId }],
    }),
    addMovie: build.mutation({
      query: (newMovie) => ({
        url: `movies`,
        method: "POST",
        body: newMovie,
      }),
      invalidatesTags: ["Movies"],
    }),
    addPost: build.mutation({
      query: (formData) => ({
        url: "/posts",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});


export const {
  useGetPostsQuery,
  useAddReviewMutation,
  useAddMovieMutation,
  useGetReviewsByPostQuery,
  useAddPostMutation,
} = baseApi;
