"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const hello_service_1 = require("../../services/hello/hello-service");
async function GET(req, res) {
    const size = req.query.size;
    try {
        const army = await hello_service_1.generateHello(Number(size));
        return res.status(200).send(army);
    }
    catch (e) {
        return res.status(500);
    }
}
exports.GET = GET;
