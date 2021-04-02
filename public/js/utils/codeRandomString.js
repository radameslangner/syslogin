function  codeRandomString() {
    const code = Math.trunc(Math.random() * 10000000 + 1 ).toString(36).toUpperCase()
    return code
}

module.exports = codeRandomString