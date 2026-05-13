import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  IconButton,
  Container,
  Avatar,
  CircularProgress,
} from "@mui/material";

import {
  DeleteOutline,
  PersonAddOutlined,
  ShieldOutlined,
  PersonOutline,
  ManageAccountsOutlined,
} from "@mui/icons-material";

import api from "../api";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/users", {
        withCredentials: true,
      });

      setUsers(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`, {
        withCredentials: true,
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await api.put(
        `/users/${id}`,
        { role },
        {
          withCredentials: true,
        },
      );

      setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await api.post("/users", newUser, {
        withCredentials: true,
      });

      setUsers((prev) => [res.data, ...prev]);

      setOpenAdd(false);

      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getRoleIcon = (role) => {
    if (role === "manager") {
      return (
        <ShieldOutlined
          sx={{
            fontSize: 16,
            color: "#a67c52",
          }}
        />
      );
    }

    if (role === "moderator") {
      return (
        <ManageAccountsOutlined
          sx={{
            fontSize: 16,
            color: "#3d405b",
          }}
        />
      );
    }

    return (
      <PersonOutline
        sx={{
          fontSize: 16,
          color: "#888",
        }}
      />
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fdfbf7",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CircularProgress
          size={60}
          sx={{
            color: "#1a1a1a",
          }}
        />

        <Typography
          sx={{
            letterSpacing: "0.2em",
            color: "#888",
            fontWeight: 700,
          }}
        >
          LOADING USERS...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fdfbf7",
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-end" }}
          sx={{
            mb: 8,
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.5em",
                color: "#a67c52",
                fontWeight: 900,
              }}
            >
              SYSTEM_DIRECTORY
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontFamily: "serif",
                fontWeight: 400,
                color: "#1a1a1a",
                mt: 1,
              }}
            >
              Access <b>Control.</b>
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<PersonAddOutlined />}
            onClick={() => setOpenAdd(true)}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              fontWeight: 900,
              letterSpacing: "0.1em",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#a67c52",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            NEW USER
          </Button>
        </Stack>

        {/* TABLE */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            border: "1px solid #eee",
            borderRadius: 0,
            bgcolor: "#fff",
          }}
        >
          <Table>
            <TableHead
              sx={{
                bgcolor: "#f9f9f9",
              }}
            >
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>IDENTITY</TableCell>

                <TableCell>CONTACT</TableCell>

                <TableCell>AUTHORIZATION</TableCell>

                <TableCell align="right">REVOKE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "#fdfbf7",
                    },
                  }}
                >
                  <TableCell>#{String(user.id).padStart(4, "0")}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: "#1a1a1a",
                          borderRadius: 0,
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>

                      <Typography
                        sx={{
                          fontWeight: 800,
                        }}
                      >
                        {user.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getRoleIcon(user.role)}

                      <Select
                        variant="standard"
                        disableUnderline
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <MenuItem value="user">USER</MenuItem>

                        <MenuItem value="moderator">MODERATOR</MenuItem>

                        <MenuItem value="manager">MANAGER</MenuItem>
                      </Select>
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          PaperProps={{
            sx: {
              borderRadius: 0,
              p: 2,
              minWidth: {
                xs: "90%",
                md: "400px",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: "serif",
              fontSize: "2rem",
            }}
          >
            Provision <b>User.</b>
          </DialogTitle>

          <DialogContent>
            <Stack
              spacing={3}
              sx={{
                mt: 2,
              }}
            >
              <TextField
                variant="standard"
                fullWidth
                label="Full Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name: e.target.value,
                  })
                }
              />

              <TextField
                variant="standard"
                fullWidth
                label="Email Address"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
              />

              <TextField
                variant="standard"
                fullWidth
                type="password"
                label="Temporary Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    password: e.target.value,
                  })
                }
              />

              <Select
                fullWidth
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value,
                  })
                }
              >
                <MenuItem value="user">User</MenuItem>

                <MenuItem value="moderator">Moderator</MenuItem>

                <MenuItem value="manager">Manager</MenuItem>
              </Select>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>

            <Button
              variant="contained"
              onClick={handleAddUser}
              sx={{
                bgcolor: "#1a1a1a",
              }}
            >
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default ManageUsersPage;
