const bcrypt = require('bcryptjs')
function criptograf(param) {

    let salt = bcrypt.genSaltSync(10);
    param = bcrypt.hashSync(param, salt);
    return param
}

module.exports = criptograf