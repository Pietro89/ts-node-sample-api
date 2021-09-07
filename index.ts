import express, { Application } from "express";
import { GET as getHello } from "./controllers/hello/hello-controller";
import path from "path";
import redoc from "redoc-express";
import * as OpenApiValidator from 'express-openapi-validator';
import {Server} from "node:http";
import pino from 'pino'

const app: Application = express();
const port = 3000 || process.env.API_PORT;

// create pino loggger
const logger = pino({
    enabled: process.env.NODE_ENV != 'test'
});

const expressPino = require('express-pino-logger')({
    logger
})

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve the yaml openapi file
const spec = path.join(__dirname, './openapi/api-doc.yaml');
app.use('/openapi-spec', express.static(spec));

// logging
app.use(expressPino)

// render the openapi as redoc documentation
app.get(
    '/docs',
    redoc({
        title: 'API Docs',
        specUrl: '/openapi-spec'
    })
);

// use the openapi spec to validate the api inputs
app.use(
    OpenApiValidator.middleware({
        apiSpec: './openapi/api-doc.yaml',
        validateResponses: true
    }),
);

// @ts-ignore format the response for openapiValidator
app.use((err, req, res, next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});


// Main endpoint
app.get(
    "/hello",
    getHello
);

let server: Server

try {
	server = app.listen(port, (): void => {
		logger.info(`Connected successfully on port ${port}`);
	});
} catch (error) {
	logger.error(`Error occurred while starting server: ${error.message}`);
}

function stop() {
    server.close();
}

// export for testing
export {app, stop}

