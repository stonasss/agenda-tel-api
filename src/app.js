import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors()).use(express.json())

app.listen(PORT, () => {
    console.log(`Servidor aberto no port ${PORT}`)
});