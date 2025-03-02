import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import proxyRoutes from "./routes/proxyRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/proxy", proxyRoutes);

app.get("/", (req, res) => res.send("Backend is running! 🚀"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
