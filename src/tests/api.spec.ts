import chai from "chai";
import "mocha";
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import {app} from  "../app"

describe('API', () => {
    // not found
    it('should return a 404 error when requesting a non existing resource', async () => {
        const res = await chai.request(app).get('/nonexistingresource')
        chai.expect(res.status).to.equal(404);
    })

})
