import {expect} from 'chai';
import {createWebServer} from "./create-web-server";
import {connectToDb} from "./db-connect";
import axios from "axios";
import {insertOperation} from "./operations";

describe('/history/:userId/delete', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();

        await pool.query(`ALTER SEQUENCE hbb_health.records_id_seq RESTART `);
        await pool.query(`ALTER SEQUENCE hbb_health.records_user_id_seq RESTART `);

        await insertOperation(pool, {
            childhoodDisease: 'disease number 1',
            majorAdultDisease: 'no disease',
            surgeries: 'eye surgery',
            priorInjuries: 'liver injury',
            medications: 'xanax',
            allergies: 'bees'
        });
    });

    after(async () => {
        await server.stop();
    });

    it('given existing person > when calling delete /history/:userId/delete > should return valid response', async () => {

        const response = await axios.delete(`http://localhost:${port}/history/1/delete`);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal('The records with the user id 1 was deleted from the database.');
    });
});