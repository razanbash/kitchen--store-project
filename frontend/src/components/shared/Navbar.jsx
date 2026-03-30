import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Container,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? "#1a1a1a" : "#888",
    textDecoration: "none",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    cursor: "pointer",
    position: "relative",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:after": {
      content: '""',
      position: "absolute",
      width: location.pathname === path ? "100%" : "0%",
      height: "1.5px",
      bottom: -6,
      left: 0,
      backgroundColor: "#1a1a1a",
      transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    "&:hover": {
      color: "#1a1a1a",
      "&:after": {
        width: "100%",
      },
    },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #f2f2f2",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{
              cursor: "pointer",
              color: "#1a1a1a",
              fontWeight: 500,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "0.2em",
              fontSize: { xs: "1.2rem", md: "1.6rem" },
            }}
            onClick={() => navigate("/")}
          >
            VELLORA
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, md: 5 },
            }}
          >
            {user ? (
              <>
                <Link
                  sx={navLinkStyle("/kitchens")}
                  onClick={() => navigate("/kitchens")}
                >
                  Kitchens
                </Link>
                <Link
                  sx={navLinkStyle("/about")}
                  onClick={() => navigate("/about")}
                >
                  About
                </Link>
                <Link
                  sx={navLinkStyle("/contact")}
                  onClick={() => navigate("/contact")}
                >
                  Contact
                </Link>
                <Box
                  onClick={handleLogout}
                  sx={{
                    ...navLinkStyle(""),
                    bgcolor: "#1a1a1a",
                    color: "#fff !important",
                    px: 3,
                    py: 1.2,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    borderRadius: "2px",
                    "&:after": { display: "none" },
                    "&:hover": {
                      bgcolor: "#444",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  Logout
                </Box>
              </>
            ) : (
              <>
                <Link
                  sx={navLinkStyle("/login")}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
                <Link
                  sx={{
                    ...navLinkStyle("/register"),
                    border: "1px solid #1a1a1a",
                    px: 3,
                    py: 1.2,
                    fontSize: "0.65rem",
                    borderRadius: "2px",
                    "&:after": { display: "none" },
                    "&:hover": {
                      bgcolor: "#1a1a1a",
                      color: "#fff !important",
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
