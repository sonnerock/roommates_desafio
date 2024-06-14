import { Router } from "express";
import axios from 'axios';
import fs from "fs"

import { v4 as uuidv4 } from 'uuid';

const router = Router()

router.post("/", async (req, res) => {
    try {
        const { roommate, descripcion, monto } = req.body;

        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
        gastosJSON.gastos.push({
            id: uuidv4(),
            roommate,
            descripcion,
            monto
        });

        fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));

        res.status(201).send("gastos guardados")
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/", async (req, res) => {
    try {
        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))
        res.status(200).send({ "gastos": gastosJSON.gastos })
    } catch (error) {
        res.status(500).send(error)
    }
});

router.put("/", async (req, res) => {
    try {
        const { id } = req.query;
        const { roommate, descripcion, monto } = req.body;

        const gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'))

        gastosJSON.gastos.map((gasto) => {
            if (gasto.id === id) {
                gasto.roommate = roommate;
                gasto.descripcion = descripcion;
                gasto.monto = monto;
            }
        });

        fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
        res.status(201).send({ "message": "gastos actualizados" })
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete("/", async (req, res) => {
    try {
        const { id } = req.query;

        let gastosJSON = JSON.parse(fs.readFileSync('gastos.json', 'utf8'));

        gastosJSON.gastos = gastosJSON.gastos.filter(gasto => gasto.id != id);

        fs.writeFileSync('gastos.json', JSON.stringify(gastosJSON));
        res.status(201).send({ "message": "gasto eliminado" })
    } catch (error) {
        res.status(500).send(error)
    }
});

export { router }