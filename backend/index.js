import express from "express";
import cors from "cors";
import kitchenRoutes from "./src/routes/kitchen.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { connectDB } from "./src/config/db.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/kitchens", kitchenRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000 ✅");
});

connectDB();
