import {expect} from 'chai';
import request from 'supertest';


describe('get medical-history', () => {

    before(async () => {

    });

    after(async () => {
    });

    it('given existing entries > when calling get medical-history > should return valid response', async () => {
        const payload = {
            requestId: 1,
            username: 'test123',
            externalToken: 1
        };

        const response = await request('http://localhost:3000/').post('/test123').send(payload);

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            personId: 1,
            entries: [{
                date: '12.12.2012',
                info: 'Bla bla',
            }]
        });
    });
});