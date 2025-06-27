import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  useGetPostsQuery,
  useAddReviewMutation,
} from "../api/api";
import { Review } from "../components/Review";
import { useParams } from "react-router";

const Feed = () => {
  const { type } = useParams();
  const { data: movies, isLoading, error } = useGetPostsQuery(type);
  const [addReview] = useAddReviewMutation();
  const [reviewInputs, setReviewInputs] = useState({});

  const handleRatingChange = (index, newRating) => {
    setReviewInputs((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        rating: newRating,
      },
    }));
  };

  const handleCommentChange = (index, newComment) => {
    setReviewInputs((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        comment: newComment,
      },
    }));
  };

  const handleSubmit = async (e, index, movieId) => {
    e.preventDefault();
    const input = reviewInputs[index];

    if (!input?.rating || !input?.comment) {
      alert("Please provide both rating and comment.");
      return;
    }

    try {
      await addReview({
        postId: movieId,
        rating: input.rating,
        comment: input.comment,
      }).unwrap();
      setReviewInputs((prev) => ({
        ...prev,
        [index]: { rating: 0, comment: "" },
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load movies.
      </Typography>
    );

  return (
    <Box sx={{ px: 2, py: 4 }}>
      {movies.map((movie, index) => {
        const input = reviewInputs[index] || {};

        return (
          <Paper
            key={movie._id}
            elevation={3}
            sx={{
              maxWidth: 600,
              mx: "auto",
              mb: 5,
              p: 3,
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <Card sx={{ mb: 2, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={`http://localhost:5000/${movie.imageUrl}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant="h6" mb={2}>
              Leave a Review
            </Typography>

            <Box mb={2}>
              <Rating
                name={`movie-rating-${movie._id}`}
                value={input.rating || 0}
                onChange={(event, newValue) =>
                  handleRatingChange(index, newValue)
                }
                size="large"
              />
            </Box>

            <Box
              component="form"
              onSubmit={(e) => handleSubmit(e, index, movie._id)}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Write your comment"
                onChange={(e) => handleCommentChange(index, e.target.value)}
                value={input.comment || ""}
                variant="outlined"
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#1976d2",
                  ":hover": { backgroundColor: "#115293" },
                  borderRadius: 2,
                }}
              >
                Submit Review
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Reviews
            </Typography>

            <Review movieId={movie._id} />
          </Paper>
        );
      })}
    </Box>
  );
};

export default Feed;
