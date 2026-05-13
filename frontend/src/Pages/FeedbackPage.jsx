import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Container,
  Paper,
  Grid,
} from "@mui/material";

import {
  West,
  ArrowRightAlt,
  Architecture,
  ModeEditOutline,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/feedback";

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please write a message before sending.");
      return;
    }

    try {
      await axios.post(API_URL, { message }, { withCredentials: true });

      setMessage("");

      toast.success("Feedback logged in the archive ✅");
    } catch (err) {
      console.error("SUBMISSION_ERROR:", err);

      toast.error(
        "Connection failed. Ensure your backend is running on port 5000.",
      );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f1ea", py: { xs: 4, md: 10 } }}>
      <Container maxWidth="md">
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: "#1a1a1a" }}
        >
          <West />
        </IconButton>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.05)",
            border: "1px solid #e0ddd5",
          }}
        >
          <Box
            sx={{
              height: "280px",
              backgroundImage:
                "url('https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2000')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.4)",
              }}
            />

            <Stack
              sx={{
                position: "absolute",
                bottom: 30,
                left: 40,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#d4a373",
                  letterSpacing: "0.5em",
                  fontWeight: 900,
                }}
              >
                KITCHEN_LOG_04
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: "#fff",
                  fontFamily: "serif",
                  fontWeight: 300,
                }}
              >
                Project <b>Reflection.</b>
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              p: { xs: 4, md: 8 },
              bgcolor: "#fff",
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Stack spacing={2}>
                  <Architecture
                    sx={{
                      color: "#a67c52",
                      fontSize: 30,
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "serif",
                      lineHeight: 1.2,
                    }}
                  >
                    Your feedback shapes our <b>Craft.</b>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#888",
                      lineHeight: 1.8,
                    }}
                  >
                    We believe in the continuous iteration of space. Describe
                    your experience with our modular installations.
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <Stack spacing={4}>
                  <Box sx={{ position: "relative" }}>
                    <ModeEditOutline
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        color: "#f0f0f0",
                        fontSize: 40,
                      }}
                    />

                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      variant="standard"
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      sx={{
                        "& .MuiInput-root": {
                          fontSize: "1.2rem",
                          fontFamily: "serif",
                          py: 1,
                          "&:before": {
                            borderBottom: "1px solid #eee",
                          },
                          "&:after": {
                            borderBottom: "1px solid #a67c52",
                          },
                        },
                      }}
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    endIcon={<ArrowRightAlt />}
                    sx={{
                      bgcolor: "#1a1a1a",
                      color: "#fff",
                      borderRadius: 0,
                      py: 2,
                      px: 6,
                      alignSelf: "flex-start",
                      fontSize: "0.75rem",
                      fontWeight: 900,
                      letterSpacing: "0.2em",
                      "&:hover": {
                        bgcolor: "#a67c52",
                      },
                      transition: "0.3s all",
                    }}
                  >
                    POST DATA
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: 4,
            opacity: 0.4,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              letterSpacing: "0.2em",
            }}
          >
            VELLORA STUDIO INTERNAL
          </Typography>

          <Typography variant="caption">REV_2026_v1</Typography>
        </Stack>
      </Container>
    </Box>
  );
}
