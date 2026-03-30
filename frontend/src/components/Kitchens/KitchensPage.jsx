import { useContext } from "react";
import { KitchensContext } from "./KitchensContext";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../../api";

function KitchensPage() {
  const { kitchens, setKitchens } = useContext(KitchensContext);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleAdd = async () => {
    const name = prompt("Enter kitchen name");
    const description = prompt("Enter description");
    const price = prompt("Enter price");
    const image = prompt("Enter image link");

    if (!name || !description || !price || !image) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/kitchens",
        { name, description, price, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setKitchens((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
    }
  };

  const handleEdit = async (kitchen) => {
    const name = prompt("Edit kitchen name", kitchen.name);
    const description = prompt("Edit description", kitchen.description);
    const price = prompt("Edit price", kitchen.price);
    const image = prompt("Edit image link", kitchen.image);

    if (!name || !description || !price || !image) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/kitchens/${kitchen.id}`,
        { name, description, price, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setKitchens((prev) =>
        prev.map((k) => (k.id === kitchen.id ? res.data : k)),
      );
    } catch (err) {
      console.log("EDIT ERROR:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/kitchens/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
              onClick={handleAdd}
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
          {" "}
          {/* Increased spacing between rows */}
          {kitchens.map((kitchen, index) => (
            <Box
              key={kitchen.id || index}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row" : "row-reverse",
                },
                gap: 8, // Increased gap for a cleaner look
                alignItems: "center",
              }}
            >
              {/* IMAGE BOX - Increased size */}
              <Box
                component="img"
                src={kitchen.image}
                alt={kitchen.name}
                sx={{
                  width: { xs: "100%", md: "60%" }, // Image takes 60% of width on desktop
                  height: { xs: 400, md: 550 }, // Height increased from 350 to 550
                  objectFit: "cover",
                  borderRadius: 1,
                  boxShadow: 3, // Optional: added depth to make large images pop
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

                {user?.role === "manager" && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(kitchen)}
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
      </Container>
    </Box>
  );
}

export default KitchensPage;
