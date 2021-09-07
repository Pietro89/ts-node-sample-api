"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHello = void 0;
const db_1 = require("../../mocks/db");
const utils_1 = require("../../commons/utils");
/**
 * Generate an hello
 * @param size the size of the hello
 * @returns the hello
 */
function generateHello(size) {
    let availableHellos = db_1.getAvailableHellos();
    availableHellos = utils_1.shuffleArray(availableHellos);
    const hello = {
        name: availableHellos[0],
        size
    };
    return hello;
}
exports.generateHello = generateHello;
