import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact-routes.js";
import authRouter from "./routes/auth-routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(cors())
app.use(contactRouter, authRouter);

app.listen(PORT, () => {
    console.log(`Servidor aberto no port ${PORT}`)
});