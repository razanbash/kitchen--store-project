import { useEffect, useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Container,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";

function ModeratorDashboard() {
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations", {
        withCredentials: true,
      });

      setReservations(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(
        `/reservations/approve/${id}`,
        {},
        { withCredentials: true },
      );

      toast.success("Reservation approved");

      fetchReservations();
    } catch (err) {
      console.log(err);

      toast.error("Approve failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(
        `/reservations/reject/${id}`,
        {},
        { withCredentials: true },
      );

      toast.success("Reservation rejected");

      fetchReservations();
    } catch (err) {
      console.log(err);

      toast.error("Reject failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reservations/${id}`, {
        withCredentials: true,
      });

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id),
      );

      toast.success("Reservation deleted");
    } catch (err) {
      console.log(err);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          bgcolor: "#f8f6f2",
        }}
      >
        <CircularProgress sx={{ color: "#111" }} />

        <Typography
          sx={{
            letterSpacing: "0.1em",
            fontWeight: 600,
          }}
        >
          Loading Reservations...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f6f2",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 7 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: "0.4em",
              color: "#b08968",
              fontWeight: 700,
            }}
          >
            MODERATOR_PANEL
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mt: 1,
              mb: 2,
            }}
          >
            Reservation Requests
          </Typography>

          <Typography
            sx={{
              color: "#777",
              maxWidth: 500,
            }}
          >
            Review, approve, reject, and manage incoming reservation requests.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 6 }}
        >
          <Paper sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography sx={{ color: "#777", mb: 1 }}>
              Total Requests
            </Typography>

            <Typography variant="h4" fontWeight="bold">
              {reservations.length}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography sx={{ color: "#777", mb: 1 }}>Approved</Typography>

            <Typography variant="h4" fontWeight="bold" color="green">
              {reservations.filter((r) => r.status === "approved").length}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography sx={{ color: "#777", mb: 1 }}>Pending</Typography>

            <Typography variant="h4" fontWeight="bold" color="#c48b36">
              {reservations.filter((r) => r.status === "pending").length}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography sx={{ color: "#777", mb: 1 }}>Rejected</Typography>

            <Typography variant="h4" fontWeight="bold" color="red">
              {reservations.filter((r) => r.status === "rejected").length}
            </Typography>
          </Paper>
        </Stack>

        {reservations.length === 0 ? (
          <Typography>No requests</Typography>
        ) : (
          <Stack spacing={4}>
            {reservations.map((r) => (
              <Paper
                key={r.id}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: "0 6px 25px rgba(0,0,0,0.05)",
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  spacing={4}
                  justifyContent="space-between"
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 3,
                        fontWeight: "bold",
                      }}
                    >
                      Reservation #{r.id}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                      <strong>User:</strong> {r.user_email || "No email"}
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                      <strong>Kitchen:</strong> {r.kitchen_name || "No kitchen"}
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                      <strong>Status:</strong>
                    </Typography>

                    <Chip
                      label={r.status}
                      sx={{
                        bgcolor:
                          r.status === "approved"
                            ? "#e8f5e9"
                            : r.status === "rejected"
                              ? "#ffebee"
                              : "#fff8e1",

                        color:
                          r.status === "approved"
                            ? "green"
                            : r.status === "rejected"
                              ? "red"
                              : "#c48b36",

                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    />
                  </Box>

                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },
                    }}
                  />

                  <Stack spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(r.id)}
                      disabled={r.status !== "pending"}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(r.id)}
                      disabled={r.status !== "pending"}
                    >
                      Reject
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}

export default ModeratorDashboard;
