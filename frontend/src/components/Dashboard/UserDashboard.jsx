import React from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Container,
  GlobalStyles,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  AutoAwesomeOutlined,
  FaceOutlined,
  LogoutOutlined,
  ArrowForwardRounded,
  TuneOutlined,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function UserDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const firstName = user?.name?.split(" ")[0] || "User";

  const actionCardStyle = {
    p: { xs: 5, md: 8 },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    bgcolor: "#a9a6a6",
    border: "1px solid #f0f0f0",
    borderRadius: "0px",
    transition: "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      bgcolor: "#1a1a1a",
      transform: "translateY(-12px)",
      boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
      "& *": { color: "#fff !important" },
      "& .btn-label": { letterSpacing: "0.4em" },
      "& .card-number": { opacity: 0.1, transform: "scale(1.2)" },
    },
  };

  return (
    <Box
      sx={{
        bgcolor: "#fdfbf7",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GlobalStyles
        styles={{
          "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');":
            "",
        }}
      />

      <Typography
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          fontSize: "45rem",
          fontWeight: 900,
          color: "#f4f1ea",
          zIndex: 0,
          userSelect: "none",
          lineHeight: 0.7,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {firstName[0]}
      </Typography>

      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Typography
          sx={{
            fontWeight: 900,
            letterSpacing: "0.4em",
            fontSize: "0.7rem",
            color: "#1a1a1a",
          }}
        >
          VELLORA STUDIO
        </Typography>
        <IconButton sx={{ color: "#1a1a1a" }}>
          <TuneOutlined />
        </IconButton>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 5, md: 10 }, pb: 15, position: "relative", zIndex: 1 }}
      >
        <Box sx={{ mb: 12 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.8em",
              color: "#a67c52",
              fontWeight: 800,
              fontSize: "0.65rem",
            }}
          >
            DESIGNER PORTAL / 2026
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              color: "#1a1a1a",
              fontSize: { xs: "3.5rem", md: "6rem" },
              lineHeight: 0.9,
              mt: 2,
            }}
          >
            Welcome, <br />
            <Box
              component="span"
              sx={{ fontStyle: "italic", color: "#d4a373" }}
            >
              {firstName}.
            </Box>
          </Typography>
        </Box>

        <Grid
          container
          spacing={0}
          sx={{ border: "1px solid #eee", bgcolor: "#eee" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={actionCardStyle} onClick={() => navigate("/kitchens")}>
              <Typography
                className="card-number"
                sx={{
                  position: "absolute",
                  top: -20,
                  right: 10,
                  fontSize: "8rem",
                  fontWeight: 900,
                  color: "#f9f9f9",
                  transition: "0.6s",
                }}
              >
                01
              </Typography>
              <Box sx={{ position: "relative" }}>
                <AutoAwesomeOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 48,
                    color: "#a67c52",
                    mb: 6,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Collections
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", lineHeight: 1.8, maxWidth: "220px" }}
                >
                  Explore bespoke Italian architectural sets and high-end
                  finishes.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mt: 10 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    transition: "0.4s",
                    color: "#a67c52",
                  }}
                >
                  OPEN ARCHIVE
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 14, color: "#a67c52" }} />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={actionCardStyle} onClick={() => navigate("/profile")}>
              <Typography
                className="card-number"
                sx={{
                  position: "absolute",
                  top: -20,
                  right: 10,
                  fontSize: "8rem",
                  fontWeight: 900,
                  color: "#f9f9f9",
                  transition: "0.6s",
                }}
              >
                02
              </Typography>
              <Box sx={{ position: "relative" }}>
                <FaceOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 48,
                    color: "#a67c52",
                    mb: 6,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Identity
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", lineHeight: 1.8, maxWidth: "220px" }}
                >
                  Manage your architectural profile and personal design
                  preferences.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mt: 10 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    transition: "0.4s",
                    color: "#a67c52",
                  }}
                >
                  EDIT PROFILE
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 14, color: "#a67c52" }} />
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={actionCardStyle}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <Typography
                className="card-number"
                sx={{
                  position: "absolute",
                  top: -20,
                  right: 10,
                  fontSize: "8rem",
                  fontWeight: 900,
                  color: "#f9f9f9",
                  transition: "0.6s",
                }}
              >
                03
              </Typography>
              <Box sx={{ position: "relative" }}>
                <LogoutOutlined
                  className="icon-box"
                  sx={{
                    fontSize: 48,
                    color: "#a67c52",
                    mb: 6,
                    transition: "0.4s",
                  }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "'Playfair Display', serif", mb: 2 }}
                >
                  Termination
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", lineHeight: 1.8, maxWidth: "220px" }}
                >
                  Securely end your design session and return to the login gate.
                </Typography>
              </Box>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mt: 10 }}
              >
                <Typography
                  className="btn-label"
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    transition: "0.4s",
                    color: "#a67c52",
                  }}
                >
                  EXIT PORTAL
                </Typography>
                <ArrowForwardRounded sx={{ fontSize: 14, color: "#a67c52" }} />
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 15,
            display: "flex",
            justifyContent: "space-between",
            opacity: 0.3,
          }}
        >
          <Typography variant="caption" sx={{ letterSpacing: "0.4em" }}>
            MILANO / AMMAN / NYC
          </Typography>
          <Typography variant="caption" sx={{ letterSpacing: "0.4em" }}>
            VELLORA STUDIO © 2026
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default UserDashboard;
