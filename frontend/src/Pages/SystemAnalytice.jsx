import { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

import api from "../api";

function SystemAnalytics() {
  const [stats, setStats] = useState({
    kitchens: 0,
    reservations: 0,
    approved: 0,
    pending: 0,
    users: 0,
  });

  const fetchAnalytics = async () => {
    try {
      const kitchensRes = await api.get("/kitchens");
      const reservationsRes = await api.get("/reservations");

      const reservations = reservationsRes.data;

      setStats({
        kitchens: kitchensRes.data.length,
        reservations: reservations.length,
        approved: reservations.filter((r) => r.status === "approved").length,
        pending: reservations.filter((r) => r.status === "pending").length,
        users: 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const cards = [
    {
      title: "Total Kitchens",
      value: stats.kitchens,
    },
    {
      title: "Reservations",
      value: stats.reservations,
    },
    {
      title: "Approved Orders",
      value: stats.approved,
    },
    {
      title: "Pending Orders",
      value: stats.pending,
    },
    {
      title: "Users",
      value: stats.users,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#bcbdb3",
        p: 6,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 6,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        System Analytics
      </Typography>

      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "#666",
                }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SystemAnalytics;
