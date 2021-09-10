import http from 'http';
import express from 'express';
import bodyParser from 'express';

export const createWebServer = () => {
    const app = express();

    const port = 3000;

    app.use(bodyParser.json());

    app.get('/person/:personId/medical-history', (req, res) => {
        const personId = req.params.personId;

        const response = {
            personId,
            entries: [{
                date: '12.12.2012',
                info: 'Bla bla',
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
