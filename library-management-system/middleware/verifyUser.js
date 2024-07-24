const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log('Incoming Token:', token);

    if (!token) {
        return res.status(401).json('Token is missing');
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.status(401).json('Error with token');
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

module.exports = verifyUser;
