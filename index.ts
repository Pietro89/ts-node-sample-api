import {Server} from 'http';
import "reflect-metadata";
import {createConnection} from "typeorm";
import logger from "./src/utils/logger"
import {app} from "./src/app"

const PORT = process.env.API_PORT || 3000

let server: Server

async function initServer() {
    try {
        await createConnection()
        logger.info(`Connected to database`);
        app.listen(PORT, (): void => {
            logger.info(`Connected successfully on port ${PORT}`);
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

