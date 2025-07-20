import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import passwordRoutes from "./routes/passwords.js";
import connectDB from "./db/db.js";
import "dotenv/config.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/passwords", passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
