import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 4,
        background: "linear-gradient(180deg, #9e8759 0%, #f5f2ed 100%)",
      }}
    >
      <Box sx={{ maxWidth: "700px" }}>
        <Typography
          variant="overline"
          sx={{
            letterSpacing: "0.3em",
            color: "#f4f2ef",
            fontWeight: 600,
          }}
        >
          BESPOKE KITCHEN DESIGN
        </Typography>

        <Typography
          variant="h2"
          fontWeight="300"
          sx={{
            color: "#f5f3f3",
            letterSpacing: "-0.02em",
            mt: 1,
            mb: 2,
            fontFamily: "serif",
          }}
        >
          Design Your Dream <br />
          <b>Kitchen.</b>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#f5eded",
            fontWeight: 300,
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          Create an account to start exploring custom kitchen designs, save your
          ideas, and bring your vision to life.
        </Typography>

        <Stack direction="row" spacing={3} justifyContent="center">
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "#2c2c2c",
              color: "#ffffff",
              px: 6,
              py: 2,
              borderRadius: "0px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.85rem",
              "&:hover": {
                bgcolor: "#4a4a4a",
              },
            }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{
              borderColor: "#2c2c2c",
              color: "#2c2c2c",
              px: 6,
              py: 2,
              borderRadius: "0px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.85rem",
              borderWidth: "1px",
              "&:hover": {
                borderWidth: "1px",
                bgcolor: "rgba(0,0,0,0.02)",
                borderColor: "#000",
              },
            }}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default LandingPage;
