import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import kitchenRoutes from "./src/routes/kitchen.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { connectDB } from "./src/config/db.js";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests , please try again later",
});

const app = express();

app.use(limiter);
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/kitchens", kitchenRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000  ✅");
  });
});
