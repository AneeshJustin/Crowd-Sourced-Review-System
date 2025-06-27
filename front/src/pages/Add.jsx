import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAddPostMutation } from "../api/api";

// Theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#1565c0" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
  },
});

// Styled Components
const Container = styled("div")({
  maxWidth: "500px",
  margin: "2rem auto",
  padding: "2rem",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  textAlign: "center",
  border: "1px solid #e0e0e0",
});
const Header = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.5rem",
  color: "#333",
  marginBottom: "1rem",
});
const CustomButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
  padding: "0.75rem",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": { backgroundColor: "#1565c0" },
});
const FileInput = styled("input")({ display: "none" });
const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  alignItems: "center",
  padding: "1rem",
});
const SelectBox = styled(FormControl)({ width: "100%" });
const PreviewCard = styled(Card)({
  marginTop: "2rem",
  borderRadius: "8px",
  padding: "1rem",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
});

export default function CreatePage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addPost] = useAddPostMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image || !selectedOption) return;

    const formData = new FormData();
    formData.append("title", name);
    formData.append("category", selectedOption);
    formData.append("description", name);
    formData.append("image", image);

    try {
      setLoading(true);
      await addPost(formData).unwrap();
      setSubmitted(true);
      setName("");
      setImage(null);
      setPreview(null);
      setSelectedOption("");
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>Create A Post</Header>
        <FormContainer onSubmit={handleSubmit}>
          <TextField
            label="Enter the title"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <label htmlFor="image-upload">
            <FileInput
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <IconButton
              component="span"
              sx={{ fontSize: 60, color: "#1976d2" }}
            >
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Profile"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <AddPhotoAlternateIcon sx={{ fontSize: 100 }} />
              )}
            </IconButton>
          </label>
          <SelectBox>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              label="Category"
              required
            >
              <MenuItem value="Movies">Movies</MenuItem>
              <MenuItem value="Electronics">Electronics & Gadgets</MenuItem>
              <MenuItem value="Hotels">Hotels</MenuItem>
              <MenuItem value="Vehicles">Vehicles</MenuItem>
              <MenuItem value="Restaurants">Restaurants</MenuItem>
            </Select>
          </SelectBox>
          <CustomButton type="submit" variant="contained">
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Submit"
            )}
          </CustomButton>
        </FormContainer>

        {submitted && preview && (
          <PreviewCard>
            <CardContent>
              <Box
                component="img"
                src={preview}
                alt="Uploaded"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  display: "block",
                  margin: "0 auto 1rem",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1976d2" }}
              >
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                Selected Option: {selectedOption}
              </Typography>
            </CardContent>
          </PreviewCard>
        )}
      </Container>
    </ThemeProvider>
  );
}
