import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Grid,
} from "@mui/material";
import {
  Kitchen,
  AddBox,
  Person,
  Logout,
  AdminPanelSettings,
  NorthEast,
  Tune,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Manager" });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const eliteTile = {
    height: "350px",
    bgcolor: "#c9c6c6",
    border: "1px solid #eee",
    p: 6,
    position: "relative",
    cursor: "pointer",
    transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      bgcolor: "#1a1a1a",
      color: "#fff",
      transform: "translateY(-10px) rotateX(4deg)",
      boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
      "& .tile-number": { color: "#333", transform: "scale(1.2)" },
      "& .tile-icon": { color: "#a67c52", transform: "translateY(-10px)" },
      "& .tile-arrow": { opacity: 1, transform: "translate(0, 0)" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfbf7",
        display: "flex",
        perspective: "1500px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "120px",
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          py: 8,
          zIndex: 10,
        }}
      >
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: "#000",
            borderRadius: 0,
            fontSize: "0.9rem",
            fontWeight: 900,
          }}
        >
          V
        </Avatar>
        <Typography
          sx={{
            transform: "rotate(-90deg)",
            letterSpacing: "1.5em",
            fontSize: "0.6rem",
            fontWeight: 900,
            color: "#ccc",
            whiteSpace: "nowrap",
          }}
        >
          ESTABLISHED / 2026
        </Typography>
        <IconButton sx={{ color: "#000" }}>
          <Tune />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 4, md: 10 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "45rem",
            fontWeight: 900,
            color: "#f4f1ea",
            zIndex: -1,
            opacity: 0.6,
            userSelect: "none",
          }}
        >
          {user.name?.[0] || "M"}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mb: 12 }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: "0.8em", color: "#a67c52", fontWeight: 900 }}
            >
              VELLORA_CORE_SYSTEM
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "serif",
                fontSize: "6rem",
                fontWeight: 200,
                lineHeight: 0.9,
                mt: 2,
              }}
            >
              Active <br />
              <b>Archives.</b>
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              {user.name.toUpperCase()}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#a67c52", letterSpacing: "0.2em" }}
            >
              ACCESS_ROOT_LEVEL
            </Typography>
          </Box>
        </Stack>

        <Grid container spacing={4}>
          {[
            {
              label: "Collections",
              icon: <Kitchen />,
              sub: "Manage Kitchen Nodes",
              path: "/kitchens",
              num: "01",
            },
            {
              label: "Deployment",
              icon: <AddBox />,
              sub: "Push New Assets",
              path: "/kitchens",
              num: "02",
            },
            {
              label: "Account",
              icon: <Person />,
              sub: "Identity Profile",
              path: "/profile",
              num: "03",
            },
            {
              label: "Terminate",
              icon: <Logout />,
              sub: "Secure Exit",
              path: "logout",
              num: "04",
            },
          ].map((tile, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box
                sx={eliteTile}
                onClick={() =>
                  tile.path === "logout" ? handleLogout() : navigate(tile.path)
                }
              >
                <Typography
                  className="tile-number"
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: 20,
                    fontSize: "10rem",
                    fontWeight: 900,
                    color: "#f9f9f9",
                    transition: "0.6s",
                    zIndex: 0,
                  }}
                >
                  {tile.num}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    className="tile-icon"
                    sx={{ color: "#a67c52", transition: "0.4s", mb: 2 }}
                  >
                    {tile.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{ fontFamily: "serif", fontWeight: 400, mb: 1 }}
                  >
                    {tile.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", letterSpacing: "0.1em", mb: 6 }}
                  >
                    {tile.sub}
                  </Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ mt: "auto" }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 900,
                        fontSize: "0.7rem",
                        letterSpacing: "0.3em",
                      }}
                    >
                      INITIALIZE
                    </Typography>
                    <NorthEast
                      className="tile-arrow"
                      sx={{
                        ml: 1,
                        opacity: 0,
                        transform: "translate(-10px, 10px)",
                        transition: "0.4s",
                        fontSize: "1rem",
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          width: "60px",
          borderLeft: "1px solid #eee",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          py: 8,
        }}
      >
        <AdminPanelSettings sx={{ color: "#a67c52", mb: 4 }} />
        <Box sx={{ flexGrow: 1, width: "1px", bgcolor: "#eee", mb: 4 }} />
        <Typography
          sx={{
            transform: "rotate(90deg)",
            fontSize: "0.5rem",
            color: "#bbb",
            whiteSpace: "nowrap",
            letterSpacing: "0.5em",
          }}
        >
          SYSTEM_ENCRYPTED_256
        </Typography>
      </Box>
    </Box>
  );
}

export default ManagerDashboard;
