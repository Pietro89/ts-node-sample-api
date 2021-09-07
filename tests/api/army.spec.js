"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
require("mocha");
const chaiHttp = require("chai-http");
chai_1.default.use(chaiHttp);
const index_1 = require("./../../index");
describe('hello API - GET Request', () => {
    after(async () => {
        await index_1.stop();
    });
    // not found
    it('should return a 404 error when requesting a non existing resource', async () => {
        const res = await chai_1.default.request(index_1.app).get('/nonexistingresource');
        chai_1.default.expect(res.status).to.equal(404);
    });
    // required parameter missing
    it('should return a 400 error when size parameter is missing', async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello');
        chai_1.default.expect(res.status).to.equal(400);
    });
    const sizePropertyMissingMessage = "request.query should have required property 'size'";
    it(`should return "${sizePropertyMissingMessage}" as error message when size parameter is missing`, async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello');
        chai_1.default.expect(JSON.parse(res.error.text).message).to.equal(sizePropertyMissingMessage);
    });
    // parameter type is wrong
    it('should return a 400 error when size in not an integer', async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello?size=wrongType');
        chai_1.default.expect(res.status).to.equal(400);
    });
    const sizePropertyTypeMessage = "request.query.size should be integer";
    it(`should return "${sizePropertyTypeMessage}" as error message when size in not an integer`, async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello?size=wrongType');
        chai_1.default.expect(JSON.parse(res.error.text).message).to.equal(sizePropertyTypeMessage);
    });
    // ok
    it('should return a 200 ok status with a number size', async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello?size=20');
        chai_1.default.expect(res.status).to.equal(200);
    });
    it('should return an hello object with name and size', async () => {
        const res = await chai_1.default.request(index_1.app).get('/hello?size=20');
        chai_1.default.expect(res.body).to.have.all.keys('name', 'size');
    });
});
