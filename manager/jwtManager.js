const jsonwebtoken = require("jsonwebtoken")

const jwtManager =  (user) => {
    const accessToken =  jsonwebtoken.sign({
        _id: user.id,
        name: user.name
    }, process.env.JWT_KEY)

    return accessToken
}

module.exports = jwtManager