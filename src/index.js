import express from 'express';
import bodyParser from 'express';

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
