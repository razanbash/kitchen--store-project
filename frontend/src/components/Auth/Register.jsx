import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import {
  MailOutline,
  LockOutlined,
  PersonOutline,
  ArrowForward,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

   const handleRegister = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (!formData.email.includes("@")) {
    alert("Invalid email");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    console.log(res.data);
    alert("Registered successfully ✅");
    navigate("/login");

  } catch (err) {
    console.log(err);
    alert("Error ❌");
  }
};

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b9af9a",
        p: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          bottom: -50,
          left: -20,
          fontWeight: 100,
          color: "rgba(244, 241, 234, 0.4)",
          fontSize: "35rem",
          lineHeight: 0.7,
          zIndex: 0,
          userSelect: "none",
          fontFamily: "serif",
        }}
      >
        V
      </Typography>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1150px",
          position: "relative",
          zIndex: 1,
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "65%" },
            height: { xs: "500px", md: "700px" },
            borderRadius: "4px",
            backgroundImage:
              "url('https://i.pinimg.com/1200x/09/03/a2/0903a23ca4ad1b7babd7c49faecd1716.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "-40px 40px 80px rgba(0,0,0,0.15)",
          }}
        />

        <Paper
          elevation={0}
          sx={{
            width: { xs: "95%", md: "40%" },
            position: "relative",
            left: { md: "-10%" },
            mr: { md: "-12%" },
            p: { xs: 4, md: 8 },
            bgcolor: "#fff",
            borderRadius: "0px",
            border: "1px solid #eee",
            boxShadow: "0px 30px 60px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.5em",
              color: "#a67c52",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          >
            STUDIO MEMBERSHIP
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              color: "#1a1a1a",
              mt: 1,
              mb: 1,
              fontWeight: 300,
            }}
          >
            Join the <b>Studio.</b>
          </Typography>

          <Typography variant="body2" sx={{ color: "#888", mb: 5 }}>
            Unlock exclusive access to our Italian kitchen collections and 3D
            planning tools.
          </Typography>

          <form onSubmit={handleRegister}>
            <Stack spacing={4}>
              <TextField
                placeholder="FULL NAME"
                variant="standard"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <PersonOutline sx={{ mr: 1, color: "#bbb" }} />
                  ),
                }}
              />

              <TextField
                placeholder="EMAIL ADDRESS"
                variant="standard"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                InputProps={{
                  startAdornment: <MailOutline sx={{ mr: 1, color: "#bbb" }} />,
                }}
              />

              <TextField
                placeholder="PASSWORD"
                type="password"
                variant="standard"
                fullWidth
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <LockOutlined sx={{ mr: 1, color: "#bbb" }} />
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  py: 2,
                  borderRadius: "0px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#000" },
                }}
              >
                Request Access
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#aaa", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              ALREADY REGISTERED?{" "}
              <Box component="span" sx={{ color: "#a67c52", fontWeight: 700 }}>
                LOGIN
              </Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Register;
