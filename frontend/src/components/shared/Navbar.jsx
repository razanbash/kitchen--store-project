import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useContext(AuthContext);

  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const navLinks = user
    ? [
        { label: "Kitchens", path: "/kitchens" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Register", path: "/register" },
      ];

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
              display: { xs: "none", md: "flex" },
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

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, color: "#1a1a1a" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)",
            px: 3,
            py: 4,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#1a1a1a" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List
          disablePadding
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {navLinks.map(({ label, path }) => (
            <ListItem key={path} disablePadding>
              <Link
                sx={navLinkStyle(path)}
                onClick={() => handleNavigate(path)}
              >
                {label}
              </Link>
            </ListItem>
          ))}

          {user && (
            <ListItem disablePadding>
              <Box
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
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
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
