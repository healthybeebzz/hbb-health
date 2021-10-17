import {expect} from 'chai';
import * as request from 'supertest';
import {createWebServer} from "./create-web-server";


describe('/history/create', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();
    });

    after(async () => {
        await server.stop();
    });

    it('given not existing entry > when calling post /history/create > should return valid response', async () => {
        const payload = {
            childhoodDisease: "disease big",
            majorAdultDisease: "chickpot",
            surgeries: "brain surgery",
            priorInjuries: "head injury",
            medications: "xannax",
            allergies: "all allergies"
        };

        const response = await request(`http://localhost:${port}`).post('/history/create').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            "entries": [
                {
                    "date": "12.12.2012",
                    "info": "Bla bla",
                }
            ],
            "personId": "1"
        });
    });
});