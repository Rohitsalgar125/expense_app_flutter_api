const { decode } = require('jsonwebtoken');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({ filename: 'access.log' })
    ]
})

function apiLogger(req, res, next) {
    var authToken
    const start = new Date();
    res.on("finish", async () => {
        const duration = new Date() - start;
        authToken = req.headers.authorization;
        if (authToken) {
            authToken = req.headers.authorization.split(' ')[1]
            let decodeedUserData = await decode(authToken, 'secretkey').data;
            return logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - hitted by - ${decodeedUserData?.name} - ${start}`);
        }
        else {
            return logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms - no token --  ${start}`);
        }
    });

    next();
}

module.exports = apiLogger;
