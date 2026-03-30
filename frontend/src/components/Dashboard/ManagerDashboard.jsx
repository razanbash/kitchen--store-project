import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ArrowForward, CameraAlt } from "@mui/icons-material";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user") ||
      '{"name": "Momen Alomari", "email": "momen@vellora.com"}',
  );
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFFFFF", p: { xs: 4, md: 12 } }}>
      <Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ position: "relative", width: 180, height: 180 }}>
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#000",
                fontSize: "4rem",
                fontWeight: 200,
                borderRadius: 0,
              }}
            >
              {user.name?.[0]}
            </Avatar>
            <Button
              component="label"
              sx={{
                position: "absolute",
                bottom: -10,
                right: -10,
                bgcolor: "#fff",
                border: "1px solid #000",
                minWidth: 0,
                p: 1,
                borderRadius: 0,
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <CameraAlt sx={{ fontSize: 18, color: "#000" }} />
              <input hidden accept="image/*" type="file" />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={9}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: "0.5em", color: "#888" }}
          >
            VERIFIED DESIGNER
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: "4.5rem",
              letterSpacing: "-0.04em",
              color: "#000",
              lineHeight: 1,
            }}
          >
            {user.name.split(" ")[0]} <br />
            <span style={{ fontWeight: 200, color: "#AAA" }}>
              {user.name.split(" ")[1]}
            </span>
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 10, borderColor: "#EEE" }} />

      <Grid container spacing={10}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
            STUDIO CREDENTIALS
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
            Your account is currently linked to the Milan Architectural
            Division.
          </Typography>
          <Button
            variant="text"
            onClick={() => setIsEditing(!isEditing)}
            endIcon={<ArrowForward />}
            sx={{
              color: "#000",
              fontWeight: 800,
              p: 0,
              "&:hover": { bgcolor: "transparent", letterSpacing: "0.1em" },
              transition: "0.3s",
            }}
          >
            {isEditing ? "SAVE CHANGES" : "EDIT PROFILE"}
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={6}>
            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 900, color: "#CCC", letterSpacing: "0.1em" }}
              >
                FULL NAME
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                defaultValue={user.name}
                disabled={!isEditing}
                sx={{
                  "& .MuiInput-input": {
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    py: 1,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 900, color: "#CCC", letterSpacing: "0.1em" }}
              >
                EMAIL ADDRESS
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                defaultValue={user.email}
                disabled={!isEditing}
                sx={{
                  "& .MuiInput-input": {
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    py: 1,
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 900, color: "#CCC", letterSpacing: "0.1em" }}
              >
                DESIGN PHILOSOPHY
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                multiline
                defaultValue="The intersection of Italian tradition and future-proof minimalism."
                disabled={!isEditing}
                sx={{
                  "& .MuiInput-input": {
                    fontSize: "1.1rem",
                    fontWeight: 300,
                    py: 1,
                    lineHeight: 1.6,
                  },
                }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ mt: 15, textAlign: "right" }}>
        <Typography
          variant="caption"
          sx={{ color: "#DDD", letterSpacing: "0.3em" }}
        >
          VELLORA / PROFILE SYSTEM v2.0
        </Typography>
      </Box>
    </Box>
  );
}

export default Profile;
