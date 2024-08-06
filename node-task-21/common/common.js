const jwt = require('jsonwebtoken');

const authChecker = (req, res, next) => {
    let authHeader, token, verifiedToken;
    try {
        authHeader = req.headers;
        if (authHeader.authorization) {
            token = authHeader.authorization.split(" ")[1];
            verifiedToken = jwt.verify(token, 'secretkey');
            if (verifiedToken) {
                return next();
            }
        }
        else {
            return res.status(401).send("Authorization failed. Enter access token.");
        }

    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

module.exports = {
    authChecker
};