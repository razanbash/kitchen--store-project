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
    transition: "all 0.4s",
    "&:after": {
      content: '""',
      position: "absolute",
      width: location.pathname === path ? "100%" : "0%",
      height: "1.5px",
      bottom: -6,
      left: 0,
      backgroundColor: "#1a1a1a",
      transition: "width 0.4s",
    },
    "&:hover": {
      color: "#1a1a1a",
      "&:after": { width: "100%" },
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

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid #f2f2f2",
        py: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            sx={{
              cursor: "pointer",
              color: "#1a1a1a",
              fontWeight: 500,
              letterSpacing: "0.2em",
            }}
            onClick={() => navigate("/")}
          >
            VELLORA
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            {user ? (
              <>
                {user?.role === "moderator" && (
                  <>
                    <Link
                      sx={navLinkStyle("/moderator")}
                      onClick={() => navigate("/moderator")}
                    >
                      Reservations
                    </Link>

                    <Box
                      onClick={handleLogout}
                      sx={{
                        bgcolor: "#1a1a1a",
                        color: "#fff",
                        px: 3,
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </Box>
                  </>
                )}

                {user?.role === "user" && (
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

                    <Link
                      sx={navLinkStyle("/feedback")}
                      onClick={() => navigate("/feedback")}
                    >
                      Feedback
                    </Link>

                    <Link
                      sx={navLinkStyle("/profile")}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Link>

                    <Link
                      sx={navLinkStyle("/my-reservations")}
                      onClick={() => navigate("/my-reservations")}
                    >
                      My Orders
                    </Link>

                    <Box
                      onClick={handleLogout}
                      sx={{
                        bgcolor: "#1a1a1a",
                        color: "#fff",
                        px: 3,
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </Box>
                  </>
                )}

                {user?.role === "manager" && (
                  <>
                    <Link
                      sx={navLinkStyle("/kitchens")}
                      onClick={() => navigate("/kitchens")}
                    >
                      Kitchens
                    </Link>

                    <Link
                      sx={navLinkStyle("/profile")}
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Link>

                    <Link
                      sx={navLinkStyle("/analytics")}
                      onClick={() => navigate("/analytics")}
                    >
                      Analytics
                    </Link>

                    <Link
                      sx={navLinkStyle("/manage-users")}
                      onClick={() => navigate("/manage-users")}
                    >
                      Manage Users
                    </Link>

                    <Box
                      onClick={handleLogout}
                      sx={{
                        bgcolor: "#1a1a1a",
                        color: "#fff",
                        px: 3,
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      Logout
                    </Box>
                  </>
                )}
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
                  sx={navLinkStyle("/register")}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Link>
              </>
            )}
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ p: 3 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>

          <List sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {user ? (
              <>
                {user?.role === "moderator" && (
                  <>
                    <ListItem>
                      <Link onClick={() => handleNavigate("/moderator")}>
                        Reservations
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Box onClick={handleLogout}>Logout</Box>
                    </ListItem>
                  </>
                )}

                {user?.role === "user" && (
                  <>
                    <ListItem>
                      <Link onClick={() => handleNavigate("/kitchens")}>
                        Kitchens
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/about")}>
                        About
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/contact")}>
                        Contact
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/feedback")}>
                        Feedback
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/profile")}>
                        Profile
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/my-reservations")}>
                        My Orders
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Box onClick={handleLogout}>Logout</Box>
                    </ListItem>
                  </>
                )}

                {user?.role === "manager" && (
                  <>
                    <ListItem>
                      <Link onClick={() => handleNavigate("/kitchens")}>
                        Kitchens
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/profile")}>
                        Profile
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/analytics")}>
                        Analytics
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Link onClick={() => handleNavigate("/manage-users")}>
                        Manage Users
                      </Link>
                    </ListItem>

                    <ListItem>
                      <Box onClick={handleLogout}>Logout</Box>
                    </ListItem>
                  </>
                )}
              </>
            ) : (
              <>
                <ListItem>
                  <Link onClick={() => handleNavigate("/login")}>Login</Link>
                </ListItem>

                <ListItem>
                  <Link onClick={() => handleNavigate("/register")}>
                    Register
                  </Link>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
