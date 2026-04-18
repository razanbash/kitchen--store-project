import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { MailOutline, LockOutlined, ArrowForward } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    try {
      const res = await api.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      setUser(res.data.user);

      const role = res.data.user.role;
      console.log("ROLE:", role);

      if (role === "manager") {
        navigate("/managerDashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#b9af9a",
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
          maxWidth: "1100px",
          position: "relative",
          zIndex: 1,
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: { xs: "250px", md: "650px" },
            borderRadius: "4px",
            backgroundImage:
              "url('https://i.pinimg.com/1200x/07/4a/e4/074ae46406851a2a23a3bd07b21cba23.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "40px 40px 80px rgba(0,0,0,0.1)",
          }}
        />

        <Paper
          elevation={0}
          sx={{
            width: { xs: "90%", md: "45%" },
            ml: { md: "-10%" },
            mt: { xs: "-50px", md: 0 },
            p: { xs: 4, md: 8 },
            bgcolor: "#fff",
            borderRadius: "0px",
            border: "1px solid #eee",
            boxShadow: "20px 20px 60px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.4em", color: "#a67c52", fontWeight: 700 }}
          >
            PRIVATE ACCESS
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              color: "#2c2c2c",
              mt: 1,
              mb: 1,
              fontWeight: 300,
            }}
          >
            Welcome back to <b>Vellora.</b>
          </Typography>

          <Typography variant="body2" sx={{ color: "#888", mb: 5 }}>
            Enter your credentials to manage your bespoke projects.
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <TextField
                placeholder="EMAIL ADDRESS"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  disableUnderline: false,
                  startAdornment: (
                    <MailOutline sx={{ mr: 1, color: "#ccc", fontSize: 18 }} />
                  ),
                }}
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#2c2c2c",
                  },
                }}
              />

              <TextField
                placeholder="PASSWORD"
                type="password"
                variant="standard"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  disableUnderline: false,
                  startAdornment: (
                    <LockOutlined sx={{ mr: 1, color: "#ccc", fontSize: 18 }} />
                  ),
                }}
                sx={{
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#2c2c2c",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disableElevation
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "#2c2c2c",
                  color: "#fff",
                  py: 2,
                  borderRadius: "0px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.75rem",
                  "&:hover": { bgcolor: "#000", gap: "10px" },
                  transition: "all 0.3s",
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Box
            sx={{
              mt: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "#aaa",
                cursor: "pointer",
                "&:hover": { color: "#2c2c2c" },
              }}
            >
              FORGOT PASSWORD?
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: "#a67c52", cursor: "pointer" }}
            >
              REQUEST INVITE
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Login;
