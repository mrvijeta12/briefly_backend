import express from "express";
import connection from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import scraperRouter from "./routes/scraperRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import cors from "cors";

const app = express();
const PORT = 5000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://briefly-frontend-phi.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // console.error(` CORS Blocked: ${origin} is not in allowed list`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions)); // Fix for Express 5 crash

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Brifly API is running...");
});
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
