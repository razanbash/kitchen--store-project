import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6f4e37",
    },
    secondary: {
      main: "#c9a27c",
    },
    background: {
      default: "#f7f3ee",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#6b6b6b",
    },
  },

  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',

    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;
