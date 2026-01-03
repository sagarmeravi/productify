import express, { urlencoded } from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import { User } from "./db/schema";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server!!");
});

app.listen(ENV.PORT, () => {
  console.log("server is running", ENV.PORT);
});
