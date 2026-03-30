import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

const RomeContactPage = () => {
  return (
    <Box sx={{ bgcolor: "#F9F8F6", color: "#1A1A1A", minHeight: "100vh" }}>
      <Box sx={{ position: "relative", pt: { xs: 12, md: 25 }, pb: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={8}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: "0.5em",
                  color: "#B5A48B",
                  fontWeight: 700,
                }}
              >
                ROME STUDIO — ITALY
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3.5rem", md: "8rem" },
                  fontWeight: 300,
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 0.9,
                  mt: 2,
                  letterSpacing: "-0.02em",
                }}
              >
                Light &{" "}
                <Box
                  component="span"
                  sx={{ fontStyle: "italic", color: "#B5A48B" }}
                >
                  Stone.
                </Box>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ textAlign: { md: "right" }, mt: { xs: 4, md: 0 } }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#888",
                  letterSpacing: "0.1em",
                  lineHeight: 2,
                }}
              >
                VIA MARGUTTA, 54 <br />
                HISTORIC CENTER, ROME <br />
                ITALY 00187
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 20 }}>
        <Box
          sx={{
            bgcolor: "#FFF",
            p: { xs: 4, md: 10 },
            border: "1px solid #EEEAE3",
            boxShadow: "0 50px 100px rgba(0,0,0,0.02)",
          }}
        >
          <Grid container spacing={10}>
            <Grid item xs={12} md={5}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 4, fontFamily: "serif" }}
              >
                Begin the Dialogue
              </Typography>
              <Typography sx={{ color: "#666", lineHeight: 2, mb: 6 }}>
                From our Rome studio, we coordinate global projects that require
                the highest level of material integrity and architectural
                precision.
              </Typography>

              <Stack spacing={4}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ fontWeight: 800, color: "#B5A48B" }}
                  >
                    General Inquiries
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 400, mt: 0.5 }}>
                    <a
                      href="mailto:hello@vellora.com"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      hello@vellora.com
                    </a>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ fontWeight: 800, color: "#B5A48B" }}
                  >
                    Studio Hours
                  </Typography>
                  <Typography sx={{ fontSize: "0.95rem", mt: 0.5 }}>
                    Mon — Fri: 10:00 - 19:00 CET
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack spacing={6}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="FULL NAME"
                      placeholder="Your Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="EMAIL"
                      placeholder="email@address.com"
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  variant="standard"
                  label="PROJECT LOCATION"
                  placeholder="City, Country"
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="standard"
                  label="YOUR VISION"
                  placeholder="Tell us about your space..."
                />
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: "#1A1A1A",
                    color: "#FFF",
                    borderRadius: 0,
                    py: 2.5,
                    px: 12,
                    letterSpacing: "0.3em",
                    alignSelf: "flex-start",
                    transition: "0.4s",
                    "&:hover": { bgcolor: "#B5A48B" },
                  }}
                >
                  SEND MESSAGE
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box
        sx={{
          height: "150vh",
          width: "60%",
          backgroundImage:
            "url('https://i.pinimg.com/736x/30/ee/0e/30ee0e6dd61eb984600d8ef6651e0904.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(10%) contrast(1.1) brightness(0.9)",
          mb: 20,
          transform: "translateX(30%)",
        }}
      />

      <Container maxWidth="lg" sx={{ pb: 20 }}>
        <Divider sx={{ mb: 12, opacity: 0.1 }} />
        <Grid
          container
          spacing={8}
          justifyContent="center"
          sx={{ textAlign: "center" }}
        >
          {[
            { city: "ROME", email: "roma@vellora.com" },
            { city: "MILAN", email: "milano@vellora.com" },
            { city: "AMMAN", email: "amman@vellora.com" },
          ].map((item) => (
            <Grid item xs={12} md={4} key={item.city}>
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.5em",
                  color: "#BBB",
                  mb: 2,
                }}
              >
                STUDIO
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 300, letterSpacing: "0.2em", mb: 1 }}
              >
                {item.city}
              </Typography>
              <Typography sx={{ color: "#999", fontSize: "0.8rem" }}>
                {item.email}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ borderTop: "1px solid #EAE8E2", py: 10, bgcolor: "#FFF" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "2rem",
                  fontFamily: "serif",
                  mb: 1,
                }}
              >
                VELLORA.
              </Typography>
              <Typography sx={{ color: "#999", fontSize: "0.8rem" }}>
                hello@vellora.com
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#DDD",
                  letterSpacing: "0.2em",
                  mt: 2,
                  display: "block",
                }}
              >
                © 2026 ARCHITECTURAL STANDARDS
              </Typography>
            </Box>
            <Typography
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                cursor: "pointer",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                "&:hover": { color: "#B5A48B" },
              }}
            >
              BACK TO TOP ↑
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RomeContactPage;
