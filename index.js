import express from "express"

import { router as roommate } from "./routes/roommate.js"
import { router as gastos } from "./routes/gastos.js"

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json())
app.use("/roommates", roommate)
app.use("/gastos", gastos)

app.listen(3000, () => {
    console.log("App escuchando puerto 3000")
})

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})