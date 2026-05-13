import { useEffect, useState } from "react";
import api from "../api";
import { Box, Typography, Paper, Stack, Divider } from "@mui/material";

function UserReservations() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/reservations/my");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleString(); 
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" mb={3}>
        My Reservations
      </Typography>

      <Stack spacing={2}>
        {data.map((r) => (
          <Paper key={r.id} sx={{ p: 3 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              {r.name || r.kitchen_name}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography>Order ID: #{r.id}</Typography>
            <Typography>Status: {r.status}</Typography>

            <Typography>Requested At: {formatDate(r.created_at)}</Typography>

            <Typography>Last Update: {formatDate(r.updated_at)}</Typography>

            {r.status === "approved" && (
              <Box sx={{ mt: 2, color: "#2e7d32" }}>
                <Typography sx={{ fontWeight: "bold" }}>Approved ✅</Typography>

                <Typography>Approved At: {formatDate(r.updated_at)}</Typography>

                <Typography>
                  Estimated Installation:{" "}
                  {new Date(
                    new Date(r.updated_at || Date.now()).getTime() +
                      7 * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString()}
                </Typography>

                <Typography>Status: In Progress 🛠️</Typography>

                <Typography sx={{ fontSize: "0.9rem", mt: 1 }}>
                  Our team will contact you within 24 hours to confirm details.
                </Typography>
              </Box>
            )}

            {r.status === "pending" && (
              <Box sx={{ mt: 2, color: "#ef6c00" }}>
                <Typography>Pending ⏳ — Waiting for approval</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  Your request is under review. Estimated response within 24
                  hours.
                </Typography>
              </Box>
            )}

            {r.status === "rejected" && (
              <Box sx={{ mt: 2, color: "#d32f2f" }}>
                <Typography>Rejected ❌</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  Unfortunately, your request was not approved. You can try
                  another kitchen.
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}

export default UserReservations;
