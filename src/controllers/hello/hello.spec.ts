import chai from "chai";
import "mocha";
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import {app} from  "../../app"
import faker from "faker"
import {connection} from "../../utils/connection";

describe('Hello Controller - GET', () => {
    before(async () => {
        await connection.create();
    });

    after(async () => {
        await connection.clear();
        await connection.close();
    });


    it('should return a 401 without a token', async () => {
        const res = await chai.request(app).get('/hello')
        chai.expect(res.status).to.equal(401);
    })

})
