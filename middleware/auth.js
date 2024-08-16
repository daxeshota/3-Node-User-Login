const jsonwebtoken = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try{
        const accessToken = req.headers.authorization.replace("Bearer ", "")
        const jwtPayload = await jsonwebtoken.verify(accessToken, process.env.JWT_KEY)
        req.user = jwtPayload
        next()
    }catch(error){
        res.status(401).json({
            status : "failed",
            message : "UNauthorized"
        })
        return ""
    }
    
}

module.exports = { auth }