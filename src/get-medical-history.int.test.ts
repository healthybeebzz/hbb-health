import {expect} from 'chai';
import {default as axios} from 'axios';
import {createWebServer} from "./create-web-server";
import {connectToDb} from "./db-connect";
import {insertOperation} from "./operations";


describe('/history/1', () => {
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
        await pool.query(`
            DELETE FROM hbb_health.records WHERE user_id=1`);

        await server.stop();
    });

    it('given existing entries > when calling get /history/:userId > should return valid response', async () => {

        const response = await axios.get(`http://localhost:${port}/history/1`);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
                records: {
                    childhoodDisease: 'disease number 1',
                    majorAdultDisease: 'no disease',
                    surgeries: 'eye surgery',
                    id: "1",
                    priorInjuries: 'liver injury',
                    medications: 'xanax',
                    allergies: 'bees',
                    userId: 1
                },
                userId: "1"
            });
        });
});