import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import fs from "fs"

const router = Router()

const url = "https://randomuser.me/api/"

router.post("/", async (req, res) => {
    try {
        axios.get(url)
            .then(({ data }) => {
                const { first, last } = data.results[0].name

                const usuariosJSON = JSON.parse(fs.readFileSync('roommate.json', 'utf8'))
                usuariosJSON.roommates.push({
                    "id": uuidv4(),
                    "nombre": `${first} ${last}`,
                    debe : 0,
                    recibe : 0
                });

                fs.writeFileSync('roommate.json', JSON.stringify(usuariosJSON));
                res.status(201).send({ usuariosJSON })
            });
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get("/", async (req, res) => {
    try {
        const usuariosJSON = JSON.parse(fs.readFileSync('roommate.json', 'utf8'))
        res.status(200).send({ roommates: usuariosJSON.roommates })
    } catch (error) {
        res.status(500).send(error)
    }
});

export { router }