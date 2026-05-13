import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Avatar,
  Grid,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import {
  Kitchen,
  AddBox,
  Person,
  Logout,
  Tune,
  AdminPanelSettings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";

function ManagerDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleApprove = async (id) => {
    await api.put(`/feedback/approve/${id}`);
    fetchFeedbacks();
  };

  const handleReject = async (id) => {
    await api.put(`/feedback/reject/${id}`);
    fetchFeedbacks();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fdfbf7", display: "flex" }}>
      <Box
        sx={{
          width: "110px",
          borderRight: "2px solid #eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
          bgcolor: "#fff",
        }}
      >
        <Avatar
          sx={{
            width: 60,
            height: 60,
            bgcolor: "#a67c52",
            borderRadius: 0,
            mb: 8,
            fontSize: "1.5rem",
            fontWeight: 900,
          }}
        >
          V
        </Avatar>

        <Stack spacing={6} sx={{ color: "#1a1a1a" }}>
          <Tune sx={{ fontSize: 28 }} />
          <AdminPanelSettings sx={{ fontSize: 28 }} />
        </Stack>
      </Box>

      <Box sx={{ flexGrow: 1, p: { xs: 4, md: 10 } }}>
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.4em",
              color: "#a67c52",
              fontWeight: 900,
              fontSize: "1rem",
            }}
          >
            MANAGER_PANEL
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "serif",
              fontSize: "5rem",
              fontWeight: 400,
              color: "#1a1a1a",
              mt: 1,
              lineHeight: 1,
            }}
          >
            Control <b>Unit.</b>
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 12 }}>
          {[
            {
              label: "COLLECTIONS",
              icon: <Kitchen sx={{ fontSize: 40 }} />,
              path: "/kitchens",
              color: "#a67c52",
            },
            {
              label: "NEW PROJECT",
              icon: <AddBox sx={{ fontSize: 40 }} />,
              path: "/kitchens",
              color: "#5b6d5b",
            },
            {
              label: "PROFILE",
              icon: <Person sx={{ fontSize: 40 }} />,
              path: "/profile",
              color: "#3d405b",
            },
            {
              label: "LOGOUT",
              icon: <Logout sx={{ fontSize: 40 }} />,
              path: "logout",
              color: "#bc4749",
            },
          ].map((tile, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper
                elevation={0}
                onClick={() =>
                  tile.path === "logout" ? handleLogout() : navigate(tile.path)
                }
                sx={{
                  p: 5,
                  borderRadius: 0,
                  bgcolor: "#fff",
                  cursor: "pointer",
                  border: "2px solid #eee",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: tile.color,
                    transform: "translateY(-10px)",
                    boxShadow: ` 0 20px 40px rgba(0,0,0,0.05)`,
                  },
                }}
              >
                <Box sx={{ color: tile.color, mb: 3 }}>{tile.icon}</Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tile.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "serif",
              mb: 5,
              borderBottom: "4px solid #a67c52",
              display: "inline-block",
              pb: 1,
            }}
          >
            Client <b>Feedback</b>
          </Typography>

          <Stack spacing={3}>
            {feedbacks.map((f) => (
              <Paper
                key={f.id}
                elevation={0}
                sx={{
                  p: 5,
                  border: "2px solid #eee",
                  borderRadius: 0,
                  bgcolor: "#fff",
                }}
              >
                <Grid container alignItems="center" spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography
                      sx={{
                        fontSize: "1.6rem",
                        fontFamily: "serif",
                        mb: 2,
                      }}
                    >
                      "{f.message}"
                    </Typography>

                    <Chip
                      label={f.status.toUpperCase()}
                      sx={{
                        borderRadius: 0,
                        fontWeight: 900,
                        px: 2,
                        bgcolor:
                          f.status === "approved" ? "#e8f5e9" : "#ffebee",
                        color: f.status === "approved" ? "#2e7d32" : "#d32f2f",
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleApprove(f.id)}
                        sx={{ bgcolor: "#2e7d32" }}
                      >
                        APPROVE
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => handleReject(f.id)}
                        sx={{ bgcolor: "#d32f2f" }}
                      >
                        REJECT
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(f.id)}
                        sx={{
                          borderColor: "#000",
                          color: "#000",
                          "&:hover": {
                            bgcolor: "#000",
                            color: "#fff",
                          },
                        }}
                      >
                        DELETE
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ManagerDashboard;
