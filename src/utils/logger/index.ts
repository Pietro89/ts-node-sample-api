import pino from "pino";

const logger = pino({
    level: process.env.NODE_ENV === 'test' ? "error" : "info"
});

export default logger
