import express, { urlencoded } from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { User } from "./db/schema";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";
import path from "path";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files in production
const frontendDist = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendDist));

app.get("/", (req, res) => {
  res.send("Server!!");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

// Catch-all route to serve index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(ENV.PORT, () => {
  console.log("server is running", ENV.PORT);
});
