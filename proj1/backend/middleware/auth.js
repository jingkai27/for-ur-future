const jwt = require('jsonwebtoken');

// secret key
const SECRET = 'your-secret-key'

function requireAuth(banana, coconut, dragonfruit) {
    console.log("doing authorisation");
    const header = banana.headers.authorization;
    if (!header) {
        return coconut.status(401).send('No token provided');
    }

    // header looks like "Bearer <token>", keep only token part
    const token = header.split(' ')[1];
    // verify() throws if the token is fake, tampered or expired
    try {
        const payload = jwt.verify(token, SECRET);
        banana.user = payload;
        dragonfruit();
    } catch (err) {
        return coconut.status(401).send("Invalid or expired token")
    }
}

module.exports = requireAuth