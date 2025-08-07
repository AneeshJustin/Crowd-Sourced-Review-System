import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Container,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const reviews = [
  {
    id: 1,
    title: "Dune: Part Two",
    author: "SciFiFan98",
    content: "Incredible visuals and a powerful story. A masterpiece!",
    image: "2.jpg",
  },
  {
    id: 2,
    title: "Barbie",
    author: "MovieBuff101",
    content: "Surprisingly deep and entertaining. Greta Gerwig delivers again!",
    image: "3.jpg",
  },
  {
    id: 3,
    title: "The Batman",
    author: "DarkKnight44",
    content: "Gritty, dark, and intense. Pattinson is a great Batman.",
    image: "4.jpg",
  },
];

const featuredMovies = [
  {
    image: "1.jpg",
    title: "Mr. Fraud",
    description:
      "A thought-provoking historical drama that dives deep into the mind of the man behind the atomic bomb.",
  },
  {
    image:
      "https://i.pinimg.com/736x/56/8c/b8/568cb8c0ad5d475c95727fab841b792d.jpg",
    title: "MacBook Air M2",
    description:
      "The MacBook Air M2 combines stunning ultra-thin design with blazing-fast performance, delivering power and elegance in perfect harmony.",
  },
  {
    image:
      "https://i.pinimg.com/736x/69/36/0b/69360b5981f5d359183b9c2a41d7b59e.jpg",
    title: "Interstellar",
    description: "A journey through space and time that explores love and survival.",
  },
  {
    image:
      "https://i.pinimg.com/736x/13/43/f9/1343f9a195cbdc2e437c0f833f460866.jpg",
    title: "The Opal Palace",
    description:
      "The Opal Palace offers an exquisite blend of luxury and sophistication, where timeless elegance meets modern comfort in a majestic setting.",
  },
  {
    image:
      "https://i.pinimg.com/736x/f0/f6/a1/f0f6a1f822b56b987f0f76a928f5d595.jpg",
    title: "El Celler de Can Roca",
    description:
      "El Celmasterpiece where the Roca brothers blend Catalan traditions with inventive techniques, creating an unforgettable dining experience that celebrates the art of food.",
  },
  {
    image:
      "https://i.pinimg.com/736x/d7/75/ee/d775ee39a8800bd53515c40d216188dd.jpg",
    title: "GT 650",
    description:
      "The **GT 650** is a powerful and versatile motorcycle that combines stylish design, smooth performance, and impressive handling, making it a perfect choice for both city commuting and long rides.",
  },
];

export default function Home() {
const [messages, setMessages] = useState([
  { from: "bot", text: "Hi! Ask me anything about movies or tech." },
]);
const [input, setInput] = useState("");

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  // Show temporary "typing..." message
  setMessages((prev) => [
    ...prev,
    { from: "bot", text: "Typing..." }
  ]);

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/chat`, {
      message: input,
    });

    const botReply = res.data.message || "No response from Gemini.";
    
    // Replace "Typing..." with actual bot message
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { from: "bot", text: botReply },
    ]);
  } catch (err) {
    console.error("Chat error:", err);
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { from: "bot", text: "Oops! Something went wrong. Try again." },
    ]);
  }
};


  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#111" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            MovieCrowd
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Featured Movie Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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

      {/* Main Content */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Recent Reviews
        </Typography>
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <Grid item key={review.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8,
                  },
                }}
              >
                {review.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={review.image}
                    alt={review.title}
                    sx={{ objectFit: "cover" }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {review.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    by {review.author}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    {review.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Chatbot UI */}
      <Container
        sx={{
          maxWidth: 600,
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          mb: 6,
          mx: "auto",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Chatbot
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            height: 300,
            overflowY: "auto",
            p: 2,
            mb: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <List>
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <ListItemText
                  primary={msg.text}
                  sx={{
                    backgroundColor:
                      msg.from === "user" ? "#1976d2" : "#e0e0e0",
                    color: msg.from === "user" ? "white" : "black",
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    maxWidth: "75%",
                    wordWrap: "break-word",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button variant="contained" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#222",
          color: "#ccc",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} RatingRealm. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
