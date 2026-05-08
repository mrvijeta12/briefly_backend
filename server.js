import express from "express";
import connection from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import scraperRouter from "./routes/scraperRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/scrape", scraperRouter);
app.use("/api/stories", storyRouter);

const startServer = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log("server is running on ", PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
