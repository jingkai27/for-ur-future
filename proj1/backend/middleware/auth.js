const jwt = require('jsonwebtoken');

// secret key
const SECRET = 'your-secret-key'

function requireAuth(banana, coconut, dragonfruit) {
    console.log("hello");
    dragonfruit()
}

module.exports = requireAuth