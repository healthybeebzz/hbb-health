import http from 'http';
import express from 'express';
import bodyParser from 'express';

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

    app.post('/create/medical-history', (req, res) => {
        console.log(req.body);
        const response = {
            status: "ok",
            message: "New medical History created."
        }
        res.send(response);
    });

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
