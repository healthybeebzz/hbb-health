import * as http from 'http';
import * as express from "express";
import * as bodyParser from "express";


export const createWebServer = () => {
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

    app.post('/history/create', (req, res) => {
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

    app.delete('/history/:userId/delete', (req: Request, res: Response) => {

    })

    const server = http.createServer(app);

    const start = () => {
        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                console.log(`App listening at http://localhost:${port}`);
                resolve();
            });
        });
    }

    const stop = () => {
        return new Promise((resolve, reject) => {
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
