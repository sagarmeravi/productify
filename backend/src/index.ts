import express, { urlencoded } from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { User } from "./db/schema";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/userRoutes";
import commentRoutes from "./routes/userRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server!!");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
  console.log("server is running", ENV.PORT);
});
