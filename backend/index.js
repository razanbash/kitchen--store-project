import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import kitchenRoutes from "./src/routes/kitchen.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { connectDB } from "./src/config/db.js";
import feedbackRoutes from "./src/routes/feedback.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import reservationRoutes from "./src/routes/reservation.routes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";
import dotenv from "dotenv";


dotenv.config();
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
    origin: "https://kitchen-store-project.vercel.app/",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/kitchens", kitchenRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000  ✅");
  });
});
app.use(errorHandler);