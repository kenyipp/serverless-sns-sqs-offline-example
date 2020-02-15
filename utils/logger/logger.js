"use strict";

const winston = require("winston");
const { format } = winston;

const logger = winston.createLogger({
    level: "debug",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
            format: format.combine(
                format.colorize(),
                format.printf(info => {
                    if (typeof info.message == "string")
                        return `${info.timestamp} ${info.level} ${info.message}`;
                    return `${info.timestamp} ${info.level} \n${JSON.stringify(info.message, null, 4)}`
                })
            ),
        })
    ]
});

module.exports = logger;
