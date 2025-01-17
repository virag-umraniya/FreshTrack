const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    console.log('Authenticating token:', token);

    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log('Token is valid:', decoded);
        next();
    } catch (err) {
        console.log('Token is not valid:', err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};