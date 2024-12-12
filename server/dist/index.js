import express from "express";
import cors from "cors";
import authRoutes from "./router/authRoutes.js";
import userRouter from "./router/userRoutes.js";
import organisationRouter from "./router/organisationRoutes.js";
import todoRouter from "./router/todoRoutes.js";
import db from "./config/db.js";
import { protect } from "./middlewares/authMiddleware.js";
const PORT = process.env.PORT || 3000;
const app = express();
db();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/organisation", protect, organisationRouter);
app.use("/todo", protect, todoRouter);
// app.use("/organisation",organisationRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
