var jwt = require('jsonwebtoken');

const SECRET = process.env.secret;

function jwtVerify(token, secretOrPublicKey, options) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, secretOrPublicKey, options, function (err, decoded) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}

module.exports = {
    jwtVerify,
    SECRET
};