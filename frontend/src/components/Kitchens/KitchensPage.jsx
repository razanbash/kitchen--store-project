import { useContext, useState } from "react";
import { KitchensContext } from "../../context/KitchensContext.jsx";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext.jsx";

function KitchensPage() {
  const { kitchens, setKitchens } = useContext(KitchensContext);
  const { user } = useContext(AuthContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [newKitchen, setNewKitchen] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const [selectedKitchen, setSelectedKitchen] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleBuy = (kitchen) => {
    alert(`You selected: ${kitchen.name}`);
  };

  const handleOpenAdd = () => {
    setNewKitchen({
      name: "",
      description: "",
      price: "",
      image: "",
    });
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = (kitchen) => {
    setSelectedKitchen({
      id: kitchen.id,
      name: kitchen.name,
      description: kitchen.description,
      price: kitchen.price,
      image: kitchen.image,
    });
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleAdd = async () => {
    if (
      !newKitchen.name ||
      !newKitchen.description ||
      !newKitchen.price ||
      !newKitchen.image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/kitchens", {
        name: newKitchen.name,
        description: newKitchen.description,
        price: newKitchen.price,
        image: newKitchen.image,
      });

      setKitchens((prev) => [...prev, res.data]);
      handleCloseAdd();
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
    }
  };

  const handleEdit = async () => {
    if (
      !selectedKitchen.name ||
      !selectedKitchen.description ||
      !selectedKitchen.price ||
      !selectedKitchen.image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.put(`/kitchens/${selectedKitchen.id}`, {
        name: selectedKitchen.name,
        description: selectedKitchen.description,
        price: selectedKitchen.price,
        image: selectedKitchen.image,
      });

      setKitchens((prev) =>
        prev.map((k) => (k.id === selectedKitchen.id ? res.data : k)),
      );

      handleCloseEdit();
    } catch (err) {
      console.log("EDIT ERROR:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/kitchens/${id}`);
      setKitchens((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <Box sx={{ bgcolor: "#bcbdb3", minHeight: "100vh", py: 12 }}>
      <Container maxWidth="lg">
        {user?.role === "manager" && (
          <Box sx={{ mb: 5 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{ bgcolor: "#111", "&:hover": { bgcolor: "#333" } }}
            >
              Add Kitchen
            </Button>
          </Box>
        )}

        <Box sx={{ mb: 10 }}>
          <Typography variant="h2" sx={{ fontWeight: 300 }}>
            Kitchens
          </Typography>
        </Box>

        <Stack spacing={15}>
          {kitchens.map((kitchen, index) => (
            <Box
              key={kitchen.id || index}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                gap: 8,
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={kitchen.image}
                alt={kitchen.name}
                sx={{
                  width: { xs: "100%", md: "60%" },
                  height: { xs: 400, md: 550 },
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: 3,
                }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 400 }}>
                  {kitchen.name}
                </Typography>

                <Typography
                  sx={{ mb: 2, color: "text.secondary", fontSize: "1.1rem" }}
                >
                  {kitchen.description}
                </Typography>

                <Typography
                  sx={{ fontWeight: "bold", mb: 3, fontSize: "1.5rem" }}
                >
                  ${Number(kitchen.price).toLocaleString()}
                </Typography>

                {user?.role !== "manager" && (
                  <Button
                    variant="contained"
                    onClick={() => handleBuy(kitchen)}
                    sx={{
                      bgcolor: "#111",
                      color: "#fff",
                      px: 4,
                      py: 1,
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      mb: 2,
                      "&:hover": { bgcolor: "#333" },
                    }}
                  >
                    BUY NOW
                  </Button>
                )}

                {user?.role === "manager" && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenEdit(kitchen)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(kitchen.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Stack>

        {kitchens.length === 0 && (
          <Typography
            sx={{ textAlign: "center", mt: 8, color: "text.secondary" }}
          >
            No kitchens found
          </Typography>
        )}

        <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
          <DialogTitle>Add Kitchen</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={newKitchen.name}
              onChange={(e) =>
                setNewKitchen({ ...newKitchen, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              value={newKitchen.description}
              onChange={(e) =>
                setNewKitchen({ ...newKitchen, description: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Price"
              margin="normal"
              type="number"
              value={newKitchen.price}
              onChange={(e) =>
                setNewKitchen({ ...newKitchen, price: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Image URL"
              margin="normal"
              value={newKitchen.image}
              onChange={(e) =>
                setNewKitchen({ ...newKitchen, image: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Cancel</Button>
            <Button variant="contained" onClick={handleAdd}>
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Kitchen</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              value={selectedKitchen.name}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  name: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              value={selectedKitchen.description}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  description: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Price"
              margin="normal"
              type="number"
              value={selectedKitchen.price}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  price: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="Image URL"
              margin="normal"
              value={selectedKitchen.image}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  image: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button variant="contained" onClick={handleEdit}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default KitchensPage;
