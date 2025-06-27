// components/FeaturedCarousel.jsx
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const featuredMovies = [
  {
    image: "1.jpg",
    title: "Oppenheimer",
    description:
      "A thought-provoking historical drama that dives deep into the mind of the man behind the atomic bomb.",
  },
  {
    image:
      "https://i.pinimg.com/originals/4d/3f/3b/4d3f3b9df7b05d5e3dfc999c3d070d9c.jpg",
    title: "Inception",
    description:
      "A mind-bending thriller that challenges the concept of reality.",
  },
  {
    image:
      "https://i.pinimg.com/originals/f4/1d/ef/f41def1e32d2bb39678ef1bcd540cde6.jpg",
    title: "Interstellar",
    description:
      "A journey through space and time that explores love and survival.",
  },
];

export default function FeaturedCarousel() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      spaceBetween={0}
      slidesPerView={1}
      style={{ height: 400 }}
    >
      {featuredMovies.map((movie, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              position: "relative",
              height: 400,
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${movie.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            <Container>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                {movie.title}
              </Typography>
              <Typography variant="h6" sx={{ maxWidth: 600 }}>
                {movie.description}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3, fontWeight: "bold", px: 4, py: 1.5 }}
              >
                Read Reviews
              </Button>
            </Container>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
