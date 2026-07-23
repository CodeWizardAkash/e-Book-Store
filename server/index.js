import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import bookRoute from "./routes/book.route.js";
import userRoute from  "./routes/user.route.js";
import cartRoute from "./routes/cart.route.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));


app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});