"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const hello_service_1 = require("../../services/hello/hello-service");
describe("generateHello", () => {
    it("should return an object", () => {
        const size = 1;
        const army = hello_service_1.generateHello(size);
        chai_1.expect(army).to.be.an('object');
    });
});
