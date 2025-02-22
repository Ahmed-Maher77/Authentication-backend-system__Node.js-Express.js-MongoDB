const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized User! Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];  // ["Bearer", "tokenValue"]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized User! Invalid token' });
        }
        req.user = decoded.UserInfo.id;
        next();
    })
}


module.exports = verifyJWT;