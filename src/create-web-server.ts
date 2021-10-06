import * as http from 'http';
import * as express from "express";
import * as bodyParser from 'express';
import {fetchRecords, insertOperation} from "./operations";
import {connectToDb} from "./db-connect";
import {asyncHandler} from "./async-handler";
import {errorHandler} from "./error-handler";
import {payloadValidationMiddleware} from "./payload-validation-middleware";


export const createWebServer = () => {

    const pool = connectToDb();
    const app = express();

    const port = 3000;

    app.use(bodyParser.json());

    app.get('/history/:userId', asyncHandler(async (req, res) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        const userId = req.params.userId;
        const records = await fetchRecords(pool, Number(req.params.userId));

        const response = {
            userId,
            records
        };

        res.send(response);
    }), errorHandler);

    app.post('/history/create', payloadValidationMiddleware, asyncHandler(async(req, res) => {

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
    }), errorHandler);

    app.put('/history/:userId/edit', asyncHandler(async(req, res) => {
        const records = await fetchRecords(pool, Number(req.params.userId));

        if (req.body.childhoodDisease) records.childhoodDisease = req.body.childhoodDisease;
        if (req.body.majorAdultDisease) records.majorAdultDisease = req.body.majorAdultDisease;
        if (req.body.surgeries) records.surgeries = req.body.surgeries;
        if (req.body.priorInjuries) records.priorInjuries = req.body.priorInjuries;
        if (req.body.medications) records.medications = req.body.medications;
        if (req.body.allergies) records.allergies = req.body.allergies;

        await pool.query(`
            UPDATE hbb_health.records 
                SET childhood_disease = '${records.childhoodDisease}',
                major_adult_disease = '${records.majorAdultDisease}',
                surgeries = '${records.surgeries}',
                prior_injuries = '${records.priorInjuries}',
                medications = '${records.medications}',
                allergies = '${records.allergies}'
            WHERE hbb_health.records.user_id=${req.params.userId}`);

        const response = {
            userId: req.params.userId,
            patientDetails: records,
        }

        res.send(response);
    }), errorHandler);

    app.delete('/history/:userId/delete', asyncHandler(async(req, res) => {
        if (!req.params.userId) throw new Error('The `userId` parameter is not present.');

        await pool.query(`
            DELETE FROM hbb_health.records WHERE user_id=${req.params.userId}`);

        res.send(`The records with the user id ${req.params.userId} was deleted from the database.`);
    }), errorHandler)

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
