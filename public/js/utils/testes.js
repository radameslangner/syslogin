const criptograf = require('./cripograf')
const compare = require('./compare')

code = '5sfoy'

cripto='$2a$10$c9eksP0Apl80AsOk7n.9M.ZQNFMbC5Qft568wcO935QdBbOgp1WQ2'

console.log(compare(code.toUpperCase(), cripto))