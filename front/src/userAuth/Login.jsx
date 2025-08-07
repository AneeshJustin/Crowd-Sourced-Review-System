import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Alert,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AuthForm({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMsg("");
    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL;

      const url = isSignup
        ? `${API_BASE}/api/auth/register`
        : `${API_BASE}/api/auth/login`;

      const payload = isSignup
        ? {
            username: data.username,
            email: data.email,
            password: data.password,
          }
        : {
            email: data.email,
            password: data.password,
          };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || (isSignup ? "Signup failed" : "Login failed"));
        return;
      }

      if (isSignup) {
        alert("Signup successful! Please login.");
        setIsSignup(false);
        reset();
      } else {
        localStorage.setItem("token", result.token); // Assuming JWT or token returned
        if (onLogin) onLogin();
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setErrorMsg("");
    reset();
    clearErrors();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #90caf9 0%, #f48fb1 100%)",
          top: "-150px",
          right: "-150px",
          zIndex: 0,
          opacity: 0.3,
          filter: "blur(80px)",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ zIndex: 2 }}
      >
        <Paper elevation={10} sx={{ p: 4, width: 400, borderRadius: 4 }}>
          <motion.div
            key={isSignup ? "signup" : "login"}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {isSignup ? "Create an Account" : "Welcome Back"}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mb: 2 }}>
              {isSignup
                ? "Join us and explore new opportunities"
                : "Log in to continue your journey"}
            </Typography>

            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {isSignup && (
                  <motion.div
                    key="username"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TextField
                      label="Username"
                      fullWidth
                      margin="normal"
                      {...register("username", { required: "Username is required" })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </motion.div>
                  ),
                }}
              />

              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: "bold",
                  }}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  {isSignup ? "Sign Up" : "Login"}
                </Button>
              </motion.div>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Button onClick={toggleMode} size="small">
                {isSignup ? "Login" : "Sign Up"}
              </Button>
            </Typography>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}
