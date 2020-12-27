const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.headers['auth-token'];
    if(!authToken) return res.status(400).send('Access Denied. You need to be signed in to access the resource.');
    jwt.verify(authToken, process.env.SECRET_KEY, (err, authUser) => {
        if(err) return res.status(403).send('Access Denied.Incorrect auth-token.');
        req.user = authUser;
        next();
    });
};