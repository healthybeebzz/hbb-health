import {expect} from 'chai';
import {createWebServer} from "./create-web-server";
import {default as axios} from 'axios';
import {connectToDb} from "./db-connect";
import {insertOperation} from "./operations";

describe('/history/1/edit', () => {
    let port: number;
    let server: { stop: () => Promise<unknown>, port: number, start: () => Promise<unknown> };

    let pool = connectToDb();

    before(async () => {
        server = createWebServer();
        port = server.port;

        await server.start();

        await pool.query(`ALTER SEQUENCE hbb_health.records_id_seq RESTART`);
        await pool.query(`ALTER SEQUENCE hbb_health.records_user_id_seq RESTART`);

        await insertOperation(pool, {
            childhoodDisease: "disease big",
            majorAdultDisease: "chickpot",
            surgeries: "brain surgery",
            priorInjuries: "head injury",
            medications: "xannax",
            allergies: "all allergies"
        });
    });

    after(async () => {
        await pool.query(`
            DELETE FROM hbb_health.records WHERE user_id=1`);

        await server.stop();
    });

    it('given not existing entry > when calling post /history/create > should return valid response', async () => {
        const payload = {
            childhoodDisease: "chickenpox"
        };

        const response = await axios.put(`http://localhost:${port}/history/1/edit`, payload);

        expect(response.status).to.be.equal(200);
        expect(response.data).to.be.deep.equal({
            patientDetails: {
                allergies: 'all allergies',
                childhoodDisease: 'chickenpox',
                id: '1',
                majorAdultDisease: 'chickpot',
                medications: 'xannax',
                priorInjuries: 'head injury',
                surgeries: 'brain surgery',
                userId: 1
            },
            userId: "1"
        });
    });
});