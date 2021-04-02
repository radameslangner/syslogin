const bcrypt = require('bcryptjs')
function compare(normal, criptografed) {
    if(bcrypt.compareSync(normal, criptografed))
    {
        return true
    } else {
        return false
    }
}

module.exports = compare