import React from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Container,
  GlobalStyles,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AutoAwesomeOutlined,
  FaceOutlined,
  LogoutOutlined,
  ArrowForwardRounded,
} from "@mui/icons-material";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || '{"name": "Razan"}');

  const actionCardStyle = {
    p: { xs: 4, md: 6 },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    bgcolor: "#b4b6ae",
    border: "1px solid #e0e0e0",
    borderRadius: "2px",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      borderColor: "#1a1a1a",
      transform: "translateY(-10px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      "& .icon-box": { color: "#1a1a1a" },
      "& .btn-label": { letterSpacing: "0.3em", color: "#1a1a1a" },
    },
  };

  return (
    <Box sx={{ bgcolor: "#eef3e9", minHeight: "100vh", position: "relative" }}>
      <GlobalStyles
        styles={{
          "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');":
            "",
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 15 } }}>
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.6em",
              color: "#999",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          >
            ESTABLISHED 2026
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              color: "#1a1a1a",
              fontSize: { xs: "2.8rem", md: "4.5rem" },
              lineHeight: 1.2,
              mt: 2,
            }}
          >
            Welcome, <br />
            <Box
              component="span"
              sx={{ fontStyle: "italic", fontWeight: 400, color: "#d4a373" }}
            >
              {user?.name}
            </Box>
          </Typography>
        </Box>

        <Grid container spacing={0} sx={{ border: "1px solid #e0e0e0" }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              borderRight: { md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
            }}
          >
            <Box sx={actionCardStyle} onClick={() => navigate("/kitchens")}>
              <Box>
                <AutoAwesomeOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 42,
                    color: "#d1d1d1",
                    mb: 5,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Kitchens Design
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#777", lineHeight: 1.8, maxWidth: "240px" }}
                >
                  Browse our high-end Italian architectural sets and custom
                  finishes.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 8 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    transition: "0.4s",
                    color: "#bbb",
                  }}
                >
                  VIEW COLLECTION
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 12, color: "#bbb" }} />
              </Stack>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              borderRight: { md: "1px solid #e0e0e0" },
              borderBottom: { xs: "1px solid #e0e0e0", md: "none" },
            }}
          >
            <Box sx={actionCardStyle} onClick={() => navigate("/profile")}>
              <Box>
                <FaceOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 42,
                    color: "#d1d1d1",
                    mb: 5,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Design Profile
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#777", lineHeight: 1.8, maxWidth: "240px" }}
                >
                  Customize your design preferences and view your saved
                  inspirations.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 8 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    transition: "0.4s",
                    color: "#bbb",
                  }}
                >
                  EDIT IDENTITY
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 12, color: "#bbb" }} />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                ...actionCardStyle,
                "&:hover": {
                  bgcolor: "#1a1a1a",
                  "& *": { color: "#fff !important" },
                },
              }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <Box>
                <LogoutOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 42,
                    color: "#d1d1d1",
                    mb: 5,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Sign Out
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#777", lineHeight: 1.8, maxWidth: "240px" }}
                >
                  Securely log out of your Vellora designer portal.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mt: 8 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    transition: "0.4s",
                    color: "#bbb",
                  }}
                >
                  LOGOUT
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 12, color: "#bbb" }} />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 10,
            textAlign: "center",
            letterSpacing: "0.5em",
            color: "#ccc",
            fontWeight: 500,
          }}
        >
          VELLORA KITCHENS — BY DESIGNERS FOR DESIGNERS
        </Typography>
      </Container>
    </Box>
  );
}

export default UserDashboard;
