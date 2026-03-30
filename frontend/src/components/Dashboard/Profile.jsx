import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import {
  West,
  CameraAltOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "razan bash",
    email: "razan@vellora.io",
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error("Load error", e);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#958c7b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: "#1a1a1a" }}>
          <West fontSize="small" />
        </IconButton>
        <Typography
          sx={{ fontWeight: 900, letterSpacing: "0.4em", fontSize: "0.7rem" }}
        >
          VELLORA STUDIO
        </Typography>
        <IconButton sx={{ color: "#1a1a1a" }}>
          <SettingsOutlined fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          px: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: "1100px",
            bgcolor: "#fff",
            borderRadius: 0,
            boxShadow: "0 50px 100px rgba(0,0,0,0.04)",
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "#1a1a1a",
              position: "relative",
              minHeight: { xs: "300px", md: "600px" },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url('https://i.pinimg.com/736x/1a/86/67/1a8667b2fd37b4ced13577e76b1fb46d.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.8,
                filter: "grayscale(20%)",
              }}
            />

            <Box sx={{ position: "absolute", bottom: 40, left: 40, zIndex: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: 0,
                  mb: 2,
                  fontSize: "2rem",
                  fontWeight: 200,
                }}
              >
                {user.name?.[0]}
              </Avatar>
              <Typography
                variant="h3"
                sx={{ color: "#fff", fontFamily: "serif", fontWeight: 700 }}
              >
                {user.name.split(" ")[0]} <br />
                <span style={{ fontWeight: 300, opacity: 0.7 }}>
                  {user.name.split(" ")[1] || ""}
                </span>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1.2,
              p: { xs: 4, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.5em", color: "#a67c52", fontWeight: 800 }}
            >
              MEMBER_ID_2026
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "serif",
                color: "#1a1a1a",
                mb: 6,
                fontWeight: 300,
              }}
            >
              Profile <b>Settings.</b>
            </Typography>

            <Stack spacing={6}>
              <TextField
                label="DISPLAY NAME"
                variant="standard"
                fullWidth
                value={user.name}
                disabled={!isEditing}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "#bbb",
                  },
                }}
                sx={{ "& .MuiInput-input": { py: 1, fontSize: "1.1rem" } }}
              />

              <TextField
                label="ACCESS EMAIL"
                variant="standard"
                fullWidth
                value={user.email}
                disabled={!isEditing}
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "#bbb",
                  },
                }}
                sx={{ "& .MuiInput-input": { py: 1, fontSize: "1.1rem" } }}
              />

              <Box sx={{ pt: 4, display: "flex", gap: 3 }}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => setIsEditing(!isEditing)}
                  sx={{
                    bgcolor: "#1a1a1a",
                    color: "#fff",
                    borderRadius: 0,
                    px: 6,
                    py: 1.5,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    "&:hover": { bgcolor: "#000" },
                  }}
                >
                  {isEditing ? "SAVE RECORD" : "EDIT PROFILE"}
                </Button>

                {!isEditing && (
                  <Button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    startIcon={<LogoutOutlined fontSize="small" />}
                    sx={{
                      color: "#999",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                    }}
                  >
                    LOGOUT
                  </Button>
                )}
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>

      <Typography
        sx={{
          position: "absolute",
          bottom: -20,
          right: 20,
          fontSize: "15rem",
          fontWeight: 900,
          color: "#f4f1ea",
          zIndex: 0,
          userSelect: "none",
          opacity: 0.5,
        }}
      >
        {user.name?.[0] || "V"}
      </Typography>
    </Box>
  );
}

export default Profile;
