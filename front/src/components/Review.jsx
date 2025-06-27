import { Typography, Box, Rating } from "@mui/material";
import {useGetReviewsByPostQuery} from "../api/api";

export const Review = ({ movieId }) => {
    const { data: reviews, isLoading } = useGetReviewsByPostQuery(movieId);
  
    if (isLoading) return <Typography>Loading reviews...</Typography>;
    if (!reviews || reviews.length === 0)
      return <Typography>No reviews yet.</Typography>;
  
    return (
      <>
        {reviews.map((rev) => (
          <Box key={rev._id} sx={{ mb: 2, p: 1, borderBottom: "1px solid #eee" }}>
            <Rating value={rev.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {rev.comment}
            </Typography>
          </Box>
        ))}
      </>
    );
  };