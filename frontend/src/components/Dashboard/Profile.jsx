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
} from "@mui/material";
import { West, SettingsOutlined, LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api";

function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSave = async () => {
    try {
      const res = await api.put("/users/profile", {
        name: user.name,
        email: user.email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      setIsEditing(false);
      setPassword("");
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#958c7b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: "1000px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage:
              "url('https://i.pinimg.com/736x/1a/86/67/1a8667b2fd37b4ced13577e76b1fb46d.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 300,
            display: "flex",
            alignItems: "flex-end",
            p: 4,
          }}
        >
          <Avatar sx={{ width: 70, height: 70 }}>{user.name?.[0]}</Avatar>
        </Box>

        <Box sx={{ flex: 1.2, p: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => navigate(-1)}>
              <West />
            </IconButton>
            <IconButton>
              <SettingsOutlined />
            </IconButton>
          </Box>

          <Typography variant="h4" sx={{ mb: 4 }}>
            Profile Settings
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Name"
              value={user.name}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              fullWidth
            />

            <TextField
              label="Email"
              value={user.email}
              disabled={!isEditing}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
            />

            {isEditing && (
              <TextField
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                sx={{ bgcolor: "#1a1a1a" }}
              >
                {isEditing ? "SAVE" : "EDIT"}
              </Button>

              {!isEditing && (
                <Button onClick={handleLogout} startIcon={<LogoutOutlined />}>
                  Logout
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default Profile;
