const winston = require('winston')

/**
 * Logging levels:
 * error: 0,
 * warn: 1,
 * info: 2,
 * verbose: 3,
 * debug: 4,
 * silly: 5
 */

 const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize( {all:true} ),
        winston.format.splat(), 
        winston.format.simple(),
        winston.format.align(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.printf(
           (info) => `${info.timestamp} [${info.level}] ${info.message}`), 

    ),
    transports: [new winston.transports.Console()],
});

module.exports = logger;

