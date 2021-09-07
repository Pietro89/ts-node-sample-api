import {expect} from "chai";
import "mocha";
import { generateHello} from "../../services/hello/hello-service";


describe("generateHello", () => {
    it("should return an object", () => {
        const size = 1
        const army = generateHello(size)
        expect(army).to.be.an('object');
    });
});

