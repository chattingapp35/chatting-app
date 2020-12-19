const jwt = require('jsonwebtoken')
const privateKey = "shhhhhkdiohfkbdfuguguew7tfguuw78fwge7wtge78efg"

function createJWT(userData) {
    var token = jwt.sign({ 
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), //token expires in 7 days
        data: userData  
    }, privateKey);
    return token
}

function decodeJWT(token) {
    var decoded = jwt.verify(token, privateKey);
    return decoded;
}

function verifyJWT(token) {
    jwt.verify(token, privateKey, function(err, decoded) {
        if(err) {
            return('Token invalid or expired')
        } else {
            return('Token is valid')
        }
    });
}


module.exports = {
    createJWT,
    decodeJWT,
    verifyJWT
}