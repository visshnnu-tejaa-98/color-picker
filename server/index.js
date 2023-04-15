import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/connection.js";

const PORT = process.env.PORT || 8000;

const app = express();

connectDB();

app.get("/", (req, res) =>
  res.send(`Server is up and running in port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`🚀🚀Color Picker server is up and running in ${PORT}🚀🚀`)
);
