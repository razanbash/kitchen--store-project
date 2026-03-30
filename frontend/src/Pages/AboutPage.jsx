import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  Divider,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Box
      sx={{
        bgcolor: "#FFFDF9",
        color: "#1A1A1A",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          pt: { xs: 12, md: 22 },
          pb: { xs: 10, md: 18 },
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(255,220,180,0.4), transparent 70%)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            sx={{
              letterSpacing: "0.4em",
              fontSize: "0.7rem",
              color: "#B8B8B8",
              mb: 2,
            }}
          >
            ESTABLISHED 2026
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Soft by Nature.
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: "#777",
              fontSize: "1.2rem",
              maxWidth: "550px",
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Designed to feel light, calm, and beautifully intentional. A kitchen
            that breathes with you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 16 }}>
        <Box
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.08)",
            transition: "0.6s ease",
            "&:hover": {
              transform: "translateY(-10px)",
            },
          }}
        >
          <Box
            component="img"
            src="https://i.pinimg.com/1200x/46/51/bf/4651bfb00fd36cc1a9b293b8035cafd7.jpg"
            sx={{
              width: "100%",
              height: { xs: "400px", md: "600px" },
              objectFit: "cover",
            }}
          />
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 16 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: "2.2rem",
                fontFamily: "serif",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              A quieter way to experience space.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                color: "#666",
                fontSize: "1.1rem",
                lineHeight: 2,
              }}
            >
              We believe design should never overwhelm. It should exist gently,
              supporting your everyday rituals. Light flows naturally, materials
              feel soft to the touch, and every detail exists for a reason.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 18 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "Calm",
              desc: "Spaces designed to slow your mind.",
            },
            {
              title: "Light",
              desc: "Natural tones that reflect softness.",
            },
            {
              title: "Flow",
              desc: "Everything moves with ease and clarity.",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  background: "#FFFFFF",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: "1.2rem",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography sx={{ color: "#777" }}>{item.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          py: 18,
          textAlign: "center",
          background: "#FAF7F2",
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.4rem" },
              fontFamily: "serif",
              fontStyle: "italic",
              color: "#333",
              lineHeight: 1.6,
            }}
          >
            “Beauty should feel effortless.”
          </Typography>

          <Typography
            sx={{
              mt: 5,
              letterSpacing: "0.25em",
              fontSize: "0.7rem",
              color: "#999",
            }}
          >
            — VELLORA
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 800 }}>VELLORA</Typography>

            <Typography
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                cursor: "pointer",
                color: "#888",
                "&:hover": { color: "#d4a373" },
              }}
            >
              Back ↑
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
