const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split('Bearer ')[1];

    if (!token) return res.status(403).send('Unauthorized');

    req.user = await admin.auth().verifyIdToken(token);
    
    if (!req.user) return res.status(403).send('Unauthorized');

    next();
}