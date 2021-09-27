import express, { Application } from "express";
import { GET as getHello } from "./controllers/hello/hello-controller";
import path from "path";
import redoc from "redoc-express";
import * as OpenApiValidator from 'express-openapi-validator';
import {Server} from 'http';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Signup, Login} from "./controllers/auth/auth-controller";
import logger from "./utils/logger"
import {BearerAuth} from "./utils/security";
const app: Application = express();
const port = 3000 || process.env.API_PORT;


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
        validateResponses: true,
        validateSecurity: {
            handlers: {
                BearerAuth
            }
        }
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

app.post(
    "/signup",
    Signup
);

app.post(
    "/login",
    Login
);


let server: Server

async function initServer() {
    try {
        await createConnection()
        logger.info(`Connected to database`);
        server = app.listen(port, (): void => {
            logger.info(`Connected successfully on port ${port}`);
        });
    } catch (error) {
        logger.error(`Error occurred while starting server: ${JSON.stringify(error)}`);
    }
}


/**
 * Provide stop method for closing the server
 */
function stop() {
    server.close();
}

// Initialization
initServer()

// export for testing
export {app, stop}

