import {expect} from "chai";
import "mocha";
import { generateHello} from "../../services/hello/hello-service";


describe("generateHello", () => {
    it("should return an object", () => {
        const size = 1
        const hello = generateHello(size)
        expect(hello).to.be.an('object');
    });
});

