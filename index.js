"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stop = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const hello_controller_1 = require("./controllers/hello/hello-controller");
const path_1 = __importDefault(require("path"));
const redoc_express_1 = __importDefault(require("redoc-express"));
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const pino_1 = __importDefault(require("pino"));
const app = express_1.default();
exports.app = app;
const port = 3000 || process.env.API_PORT;
// create pino loggger
const logger = pino_1.default({
    enabled: process.env.NODE_ENV != 'test'
});
const expressPino = require('express-pino-logger')({
    logger
});
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// serve the yaml openapi file
const spec = path_1.default.join(__dirname, './openapi/api-doc.yaml');
app.use('/openapi-spec', express_1.default.static(spec));
// logging
app.use(expressPino);
// render the openapi as redoc documentation
app.get('/docs', redoc_express_1.default({
    title: 'API Docs',
    specUrl: '/openapi-spec'
}));
// use the openapi spec to validate the api inputs
app.use(OpenApiValidator.middleware({
    apiSpec: './openapi/api-doc.yaml',
    validateResponses: true
}));
// @ts-ignore format the response for openapiValidator
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});
// Main endpoint
app.get("/hello", hello_controller_1.GET);
let server;
try {
    server = app.listen(port, () => {
        logger.info(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    logger.error(`Error occurred while starting server: ${error.message}`);
}
function stop() {
    server.close();
}
exports.stop = stop;
