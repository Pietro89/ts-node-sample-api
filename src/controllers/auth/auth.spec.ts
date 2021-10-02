import chai from "chai";
import "mocha";
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import {app} from  "../../app"
import faker from "faker"
import {connection} from "../../utils/connection";

describe('Auth Controller - signup', () => {
    before(async () => {
        await connection.create();
    });

    after(async () => {
        await connection.clear();
        await connection.close();
    });

    it('should return a 405 error code when GET /signup is called', async () => {
        const res = await chai.request(app).get('/signup')
        chai.expect(res.status).to.equal(405);
    })

    it('should return a 415 error code when body is missing', async () => {
        const res = await chai.request(app).post('/signup')
        chai.expect(res.status).to.equal(415);
    })

    it('should return a 400 error code when email is not valid', async () => {
        const body = {
                email: "notavalidemail"
            }

        const res = await chai.request(app).post('/signup')
            .send(body)
        chai.expect(res.status).to.equal(400);
    })

    it('should return a 400 error code when email is already signed up', async () => {
        const body = {
            email: faker.internet.email()
        }
        await chai.request(app).post('/signup')
            .send(body)

        const res = await chai.request(app).post('/signup')
            .send(body)
        chai.expect(res.status).to.equal(400);
    })


    it('should return a 200 ok when email is valid and not existing', async () => {
        const body = {
            email: faker.internet.email()
        }
        const res = await chai.request(app).post('/signup')
            .send(body)
        chai.expect(res.status).to.equal(200);
    })

})


describe('Auth Controller - Login', () => {
    before(async () => {
        await connection.create();
    });

    after(async () => {
        await connection.clear();
        await connection.close();
    });
    it('should return a 405 error code when GET /login is called', async () => {
        const res = await chai.request(app).get('/login')
        chai.expect(res.status).to.equal(405);
    })

    it('should return a 415 error code when body is missing', async () => {
        const res = await chai.request(app).post('/login')
        chai.expect(res.status).to.equal(415);
    })

    const newUserEmail = faker.internet.email()

    it('should return a 403 error code when user is not signed up', async () => {
        const body = {
            email: newUserEmail
        }
        const res = await chai.request(app).post('/login')
            .send(body)
        chai.expect(res.status).to.equal(403);
    })

    it('should return 200 when requesting login for a logged user', async () => {
        const body = {
            email: newUserEmail
        }
        await chai.request(app).post('/signup')
            .send(body)
        const res = await chai.request(app).post('/login')
            .send(body)
        chai.expect(res.status).to.equal(200);
    })


})
