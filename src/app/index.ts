import {Application} from "express";
import express, {Request, Response, ErrorRequestHandler} from "express";
import {BearerAuth} from "../utils/security";
import * as OpenApiValidator from 'express-openapi-validator';
import path from "path";
import redoc from "redoc-express";
import logger from "../utils/logger";

const app: Application = express();

const expressPino = require('express-pino-logger')({
    logger
})

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// serve the yaml openapi file
const spec = path.join(__dirname, '../openapi/api-doc.yaml');
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
        apiSpec: './src/openapi/api-doc.yaml',
        validateResponses: true,
        validateSecurity: {
            handlers: {
                BearerAuth
            }
        },
        operationHandlers: path.join(__dirname, '../controllers')
    }),
);


// Setup openApiValidator error middleware
interface OpenApiValidatorError {
    status:number,
    message: string
}

app.use((err: OpenApiValidatorError, req: Request, res:Response) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message
    });
});

export { app };
