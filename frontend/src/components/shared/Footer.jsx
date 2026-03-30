import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 3, md: 10 },
        py: 3,
        backgroundColor: "#fdfbf7",
        borderTop: "1px solid #eee4d9",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: "#5c4033",
          fontWeight: 800,
          letterSpacing: "0.2em",
          fontSize: "0.75rem",
        }}
      >
        VELLORA KITCHENS
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "#a09488",
          fontWeight: 400,
          letterSpacing: "0.05em",
        }}
      >
        © 2026. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
}

export default Footer;
