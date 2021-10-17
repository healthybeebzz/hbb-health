import {expect} from 'chai';
import {createWebServer} from "./create-web-server";
import {default as axios} from 'axios';


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

    it('given existing entries > when calling get medical-history > should return valid response', async () => {
        const payload = {
                childhoodDisease: 'diseases and other diseases',
                majorAdultDisease: 'non disease',
                surgeries: 'knee surgery',
                priorInjuries: 'head injury',
                medications: 'paracetamol',
                allergies: 'penutbutter'
        };

        const response = await axios.post(`http://localhost:${port}/history/create`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            "message": "New medical History created.",
            "status": "ok"
        });
    });
});