const winston = require('winston')
const logger = winston.createLogger({
  exitOnError: false,
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "logs.log",
      
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
     
    }),
  ],
});

module.exports = logger;
