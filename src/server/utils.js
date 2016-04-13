var jwt = require('jsonwebtoken');

/*jwt.sign({ username: username }, user.salt, null, function(token) {
    res.json({
        username: username,
        token: token
    });
});*/

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
    jwtVerify
};