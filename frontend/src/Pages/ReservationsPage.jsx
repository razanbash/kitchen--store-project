import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

import { Box, TextField, Button, Typography, Paper } from "@mui/material";

function ReservationPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !time) {
      toast.error("Fill all fields");
      return;
    }

    try {
      await api.post(
        "/reservations",
        { name, date, time },
        { withCredentials: true },
      );

      toast.success("Reservation created");

      setName("");
      setDate("");
      setTime("");
    } catch (err) {
      console.log(err);

      toast.error("Error creating reservation");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#b9af9a",
      }}
    >
      <Paper sx={{ p: 5, width: 400 }}>
        <Typography variant="h5" mb={3}>
          Create Reservation
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Book
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default ReservationPage;
