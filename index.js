import express from 'express';
import bodyParser from 'express';

const app = express();

const port = 3000;

app.use(bodyParser.json());


app.get('/person/:personId/medicalHistory', (req, res) => {
    const personId = req.params.personId;

    const response = {
        personId,
        firstName: "Maria",
        lastName: "Mihaila",
        medicalHistory: {
            diseases: 'none',
            age: '26',
            sex: 'f',
            reasonForCheckup: 'headaches'
        }
    };

    res.send(response);
});

app.post('/create/medicalHistory', (req, res) => {
    const response = {
        status: "ok",
        message: "New medical History created."
    }
    res.send(response);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
