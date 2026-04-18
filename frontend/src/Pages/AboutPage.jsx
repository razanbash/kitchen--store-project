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
          pt: { xs: 14, md: 24 },
          pb: { xs: 10, md: 18 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(circle, rgba(255,220,180,0.45), transparent 70%)",
            filter: "blur(120px)",
            zIndex: 0,
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box sx={{ width: 40, height: "1px", bgcolor: "#C8B89A" }} />
            <Typography
              sx={{
                letterSpacing: "0.5em",
                fontSize: "0.65rem",
                color: "#B8B8B8",
                fontWeight: 600,
              }}
            >
              ESTABLISHED 2026
            </Typography>
            <Box sx={{ width: 40, height: "1px", bgcolor: "#C8B89A" }} />
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: "3.2rem", md: "5.5rem" },
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              mb: 1,
            }}
          >
            Soft by Nature.
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "3.2rem", md: "5.5rem" },
              fontWeight: 400,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#d4a373",
              mb: 4,
            }}
          >
            Bold by Design.
          </Typography>

          <Typography
            sx={{
              color: "#888",
              fontSize: "1.1rem",
              maxWidth: "500px",
              mx: "auto",
              lineHeight: 2,
              fontWeight: 300,
            }}
          >
            Designed to feel light, calm, and beautifully intentional. A kitchen
            that breathes with you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 20 }}>
        <Box
          sx={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.1)",
            transition: "0.7s cubic-bezier(0.23, 1, 0.32, 1)",
            "&:hover": {
              transform: "translateY(-12px)",
              boxShadow: "0 60px 120px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box
            component="img"
            src="https://i.pinimg.com/1200x/46/51/bf/4651bfb00fd36cc1a9b293b8035cafd7.jpg"
            sx={{
              width: "100%",
              height: { xs: "420px", md: "620px" },
              objectFit: "cover",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 32,
              left: 32,
              bgcolor: "rgba(255,253,249,0.85)",
              backdropFilter: "blur(12px)",
              px: 3,
              py: 1.5,
              borderRadius: "8px",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "#a67c52",
              }}
            >
              VELLORA SIGNATURE COLLECTION
            </Typography>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mb: 20 }}>
        <Divider sx={{ mb: 10, borderColor: "#F0EBE3" }} />
        <Grid container spacing={10} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography
              sx={{
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                lineHeight: 1.4,
                color: "#1a1a1a",
              }}
            >
              A quieter way to experience space.
            </Typography>
            <Box
              sx={{
                mt: 4,
                width: 60,
                height: "3px",
                bgcolor: "#d4a373",
                borderRadius: "2px",
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography
              sx={{
                color: "#777",
                fontSize: "1.05rem",
                lineHeight: 2.2,
                fontWeight: 300,
              }}
            >
              We believe design should never overwhelm. It should exist gently,
              supporting your everyday rituals. Light flows naturally, materials
              feel soft to the touch, and every detail exists for a reason.
            </Typography>

            <Stack
              direction="row"
              spacing={6}
              sx={{ mt: 6, pt: 6, borderTop: "1px solid #F0EBE3" }}
            >
              {[
                { num: "12+", label: "Collections" },
                { num: "200+", label: "Projects" },
                { num: "4", label: "Countries" },
              ].map((stat, i) => (
                <Box key={i}>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      fontFamily: "'Playfair Display', serif",
                      color: "#1a1a1a",
                    }}
                  >
                    {stat.num}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      color: "#aaa",
                      fontWeight: 600,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 10, borderColor: "#F0EBE3" }} />
      </Container>

      <Container maxWidth="lg" sx={{ mb: 20 }}>
        <Typography
          sx={{
            fontSize: "0.65rem",
            letterSpacing: "0.5em",
            color: "#B8B8B8",
            fontWeight: 600,
            mb: 6,
          }}
        >
          OUR PILLARS
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              title: "Calm",
              desc: "Spaces designed to slow your mind.",
              num: "01",
            },
            {
              title: "Light",
              desc: "Natural tones that reflect softness.",
              num: "02",
            },
            {
              title: "Flow",
              desc: "Everything moves with ease and clarity.",
              num: "03",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box
                sx={{
                  p: 5,
                  borderRadius: "20px",
                  background: "#FFFFFF",
                  border: "1px solid #F0EBE3",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                  transition: "0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.09)",
                    borderColor: "#d4a373",
                  },
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: 16,
                    fontSize: "6rem",
                    fontWeight: 900,
                    color: "#FAF7F2",
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {item.num}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: "1.3rem",
                    fontFamily: "'Playfair Display', serif",
                    position: "relative",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{ color: "#888", lineHeight: 1.8, position: "relative" }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box
        sx={{
          py: 20,
          textAlign: "center",
          background: "linear-gradient(180deg, #FAF7F2 0%, #FFF8F0 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(212,163,115,0.12), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <Container maxWidth="md" sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontSize: { xs: "0.6rem", md: "0.65rem" },
              letterSpacing: "0.5em",
              color: "#d4a373",
              fontWeight: 700,
              mb: 4,
            }}
          >
            OUR PHILOSOPHY
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "1.8rem", md: "2.6rem" },
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              color: "#2a2a2a",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            "Beauty should feel effortless."
          </Typography>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box sx={{ width: 30, height: "1px", bgcolor: "#C8B89A" }} />
            <Typography
              sx={{
                letterSpacing: "0.3em",
                fontSize: "0.65rem",
                color: "#aaa",
                fontWeight: 600,
              }}
            >
              VELLORA
            </Typography>
            <Box sx={{ width: 30, height: "1px", bgcolor: "#C8B89A" }} />
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 6, borderTop: "1px solid #F0EBE3" }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontWeight: 900,
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
              }}
            >
              VELLORA
            </Typography>
            <Typography
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                cursor: "pointer",
                color: "#aaa",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                transition: "0.3s",
                "&:hover": { color: "#d4a373" },
              }}
            >
              BACK TO TOP ↑
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
