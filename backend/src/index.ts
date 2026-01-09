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

app.get("/api/health", (req, res) => {
  res.send("Server!!");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(ENV.PORT, () => {
  console.log("server is running", ENV.PORT);
});
