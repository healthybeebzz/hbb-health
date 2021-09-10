import {expect} from 'chai';
import {sum} from './helpers.js';


describe('helpers', () => {

    it('given sum function > when calling sum with two valid params > should return valid response', async () => {
        const resposne = sum(1,2);

        expect(resposne).to.equal(3);
    });
});