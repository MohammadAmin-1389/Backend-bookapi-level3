import express from "express";
import mongoose from "mongoose";
import c from "config";

import router from "./src/router/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

const port = c.get("port");
const mongoUrl = c.get("mongo.url");

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
