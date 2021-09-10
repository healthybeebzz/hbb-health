import {expect} from 'chai';
import request from 'supertest';
import {createWebServer} from "./create-web-server.js";


describe('/create/medical-history', () => {
    let port;
    let server;

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
            requestId: 1,
            username: 'test123',
            externalToken: 1
        };

        const response = await request(`http://localhost:${port}`).post('/create/medical-history').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            "message": "New medical History created.",
            "status": "ok"
        });
    });
});