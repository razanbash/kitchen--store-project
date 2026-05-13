import { useContext, useState, useEffect } from "react";
import { KitchensContext } from "../../context/KitchensContext.jsx";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function KitchensPage() {
  const { kitchens, setKitchens } = useContext(KitchensContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [openCustomize, setOpenCustomize] = useState(false);
  const [customKitchen, setCustomKitchen] = useState(null);

  const [cabinetColor, setCabinetColor] = useState("White");
  const [counterMaterial, setCounterMaterial] = useState("Quartz");
  const [kitchenSize, setKitchenSize] = useState("Medium");

  const [newKitchen, setNewKitchen] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const [selectedKitchen, setSelectedKitchen] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const calculatePrice = () => {
    if (!customKitchen) return 0;

    let finalPrice = Number(customKitchen.price);

    if (counterMaterial === "Marble") {
      finalPrice += 1500;
    }

    if (counterMaterial === "Granite") {
      finalPrice += 1000;
    }

    if (kitchenSize === "Large") {
      finalPrice += 2500;
    }

    if (kitchenSize === "Small") {
      finalPrice -= 500;
    }

    return finalPrice;
  };

  const handleBuy = async (kitchen) => {
    try {
      await api.post(
        "/reservations",
        { kitchen_id: kitchen.id },
        { withCredentials: true },
      );

      toast.success("Reservation sent ✅");

      navigate("/my-reservations");
    } catch {
      toast.error("Error ❌");
    }
  };

  const handleAdd = async () => {
    try {
      const res = await api.post("/kitchens", newKitchen);

      setKitchens((prev) => [...prev, res.data]);

      setOpenAdd(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await api.put(
        `/kitchens/${selectedKitchen.id}`,
        selectedKitchen,
      );

      setKitchens((prev) =>
        prev.map((k) => (k.id === selectedKitchen.id ? res.data : k)),
      );

      setOpenEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/kitchens/${id}`);

      setKitchens((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredKitchens = kitchens.filter((k) => {
    const matchSearch =
      k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.description.toLowerCase().includes(search.toLowerCase());

    const matchPrice = !maxPrice || Number(k.price) <= Number(maxPrice);

    const matchCategory = !category || k.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#bcbdb3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CircularProgress sx={{ color: "#111" }} />

        <Typography
          sx={{
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          Loading Kitchens...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#bcbdb3", minHeight: "100vh", py: 12 }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={3} sx={{ mb: 6, flexWrap: "wrap" }}>
          <TextField
            label="Search kitchens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 250 }}
          />

          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            sx={{ width: 200 }}
          />

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Modern">Modern</MenuItem>
            <MenuItem value="Luxury">Luxury</MenuItem>
            <MenuItem value="Minimal">Minimal</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
          </TextField>
        </Stack>

        <Stack spacing={10}>
          {filteredKitchens.map((kitchen, index) => (
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
                src={
                  kitchen.image
                    ? kitchen.image.startsWith("http")
                      ? kitchen.image
                      : `http://localhost:5000${kitchen.image}`
                    : "https://via.placeholder.com/500"
                }
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
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {kitchen.name}
                </Typography>

                <Typography sx={{ mb: 2, color: "text.secondary" }}>
                  {kitchen.description}
                </Typography>

                <Typography
                  sx={{
                    mb: 2,
                    color: "#555",
                    fontWeight: 600,
                  }}
                >
                  Category: {kitchen.category}
                </Typography>

                <Typography sx={{ fontWeight: "bold", mb: 3 }}>
                  ${Number(kitchen.price).toLocaleString()}
                </Typography>

                {user?.role !== "manager" && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setCustomKitchen(kitchen);
                      setOpenCustomize(true);
                    }}
                    sx={{ bgcolor: "#111" }}
                  >
                    CUSTOMIZE & ORDER
                  </Button>
                )}

                {user?.role === "manager" && (
                  <Stack direction="row" spacing={2}>
                    <Button
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setSelectedKitchen(kitchen);
                        setOpenEdit(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(kitchen.id)}
                    >
                      Delete
                    </Button>

                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => setOpenAdd(true)}
                    >
                      Add
                    </Button>
                  </Stack>
                )}
              </Box>
            </Box>
          ))}
        </Stack>

        <Dialog
          open={openCustomize}
          onClose={() => setOpenCustomize(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: 700 }}>
            Customize Your Kitchen
          </DialogTitle>

          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <TextField
                select
                label="Cabinet Color"
                value={cabinetColor}
                onChange={(e) => setCabinetColor(e.target.value)}
              >
                <MenuItem value="White">White</MenuItem>
                <MenuItem value="Black">Black</MenuItem>
                <MenuItem value="Wood">Wood</MenuItem>
                <MenuItem value="Beige">Beige</MenuItem>
                <MenuItem value="Gray">Gray</MenuItem>
              </TextField>

              <TextField
                select
                label="Counter Material"
                value={counterMaterial}
                onChange={(e) => setCounterMaterial(e.target.value)}
              >
                <MenuItem value="Quartz">Quartz</MenuItem>
                <MenuItem value="Marble">Marble</MenuItem>
                <MenuItem value="Granite">Granite</MenuItem>
                <MenuItem value="Wood">Wood</MenuItem>
              </TextField>

              <TextField
                select
                label="Kitchen Size"
                value={kitchenSize}
                onChange={(e) => setKitchenSize(e.target.value)}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </TextField>

              <Box
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ mb: 1 }}>
                  Cabinet Color: <b>{cabinetColor}</b>
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  Counter Material: <b>{counterMaterial}</b>
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  Kitchen Size: <b>{kitchenSize}</b>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#111",
                  }}
                >
                  Final Price: ${calculatePrice().toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenCustomize(false)}>Cancel</Button>

            <Button
              variant="contained"
              sx={{ bgcolor: "#111" }}
              onClick={() => {
                handleBuy(customKitchen);
                setOpenCustomize(false);
              }}
            >
              Confirm Order
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
          <DialogTitle>Add Kitchen</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              sx={{ mt: 2 }}
              onChange={(e) =>
                setNewKitchen({
                  ...newKitchen,
                  name: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Description"
              sx={{ mt: 2 }}
              onChange={(e) =>
                setNewKitchen({
                  ...newKitchen,
                  description: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Price"
              sx={{ mt: 2 }}
              onChange={(e) =>
                setNewKitchen({
                  ...newKitchen,
                  price: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Image"
              sx={{ mt: 2 }}
              onChange={(e) =>
                setNewKitchen({
                  ...newKitchen,
                  image: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              select
              label="Category"
              sx={{ mt: 2 }}
              onChange={(e) =>
                setNewKitchen({
                  ...newKitchen,
                  category: e.target.value,
                })
              }
            >
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
              <MenuItem value="Minimal">Minimal</MenuItem>
              <MenuItem value="Classic">Classic</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit Kitchen</DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              sx={{ mt: 2 }}
              value={selectedKitchen.name || ""}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  name: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              value={selectedKitchen.description || ""}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  description: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              value={selectedKitchen.price || ""}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  price: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              sx={{ mt: 2 }}
              value={selectedKitchen.image || ""}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  image: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              select
              sx={{ mt: 2 }}
              value={selectedKitchen.category || ""}
              onChange={(e) =>
                setSelectedKitchen({
                  ...selectedKitchen,
                  category: e.target.value,
                })
              }
            >
              <MenuItem value="Modern">Modern</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
              <MenuItem value="Minimal">Minimal</MenuItem>
              <MenuItem value="Classic">Classic</MenuItem>
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEdit}>Save</Button>
          </DialogActions>
        </Dialog>

        {filteredKitchens.length === 0 && (
          <Typography sx={{ textAlign: "center", mt: 8 }}>
            No kitchens found
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default KitchensPage;
