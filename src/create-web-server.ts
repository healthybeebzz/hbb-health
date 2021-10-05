import * as http from 'http';
import * as express from "express";
import * as bodyParser from 'express';
import {insertOperation} from "./operations";
import {connectToDb} from "./db-connect";


export const createWebServer = () => {

    const pool = connectToDb();
    const app = express();

    const port = 3000;

    app.use(bodyParser.json());

    app.get('/history/:userId', (req, res) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        const userId = req.params.userId;

        const response = {
            userId,
            entries: [{
                childhoodDisease: 'bkdjad',
                majorAdultDisease:'rhsh',
                surgeries: 'dfhsdh',
                priorInjuries: 'dfhdfh',
                medications: 'sdhd',
                allergies: 'dhdfh'
            }]
        };

        res.send(response);
    });

    app.post('/history/create', async(req, res) => {

        await insertOperation(pool, {
            childhoodDisease: req.body.childhoodDisease,
            majorAdultDisease: req.body.majorAdultDisease,
            surgeries: req.body.surgeries,
            priorInjuries: req.body.priorInjuries,
            medications: req.body.medications,
            allergies: req.body.allergies});

        const response = {
            status: "ok",
            message: "New medical History created."
        }
        res.send(response);
    });

    app.put('/history/:userId/edit', (req, res) => {

        // temporary payload format
        const payload = {
            userId: 12,
            childhoodDisease: 'bkdjad',
            majorAdultDisease:'rhsh',
            surgeries: 'dfhsdh',
            priorInjuries: 'dfhdfh',
            medications: 'sdhd',
            allergies: 'dhdfh'
        }

        const response = {
            status: "ok",
            message: "Medical history updated."
        }
        res.send(response);
    });

    app.delete('/history/:userId/delete', (req, res) => {

        res.send(`The user with the id ${req.params.userId} was deleted from the database.`);
    })

    const server = http.createServer(app);

    const start = () => {
        return new Promise<void>((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return new Promise<void>((resolve, reject) => {
            server.close(err => {
                if (err) return reject();

                console.log(`App closed from http://localhost:${port}`);
                resolve();
            })
        });
    }

    return {
        start,
        stop,
        port
    }
}
