const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        console.log(token)
        jwt.verify(token, 'SK', (err, user) => {
            if(err) res.status(403).json('token is not valid')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json('you are not authenticaticated')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            res.status(403).json('you are not allowed to do that')
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            console.log('you are in admin mode')
            next()
        }else {
            res.status(403).json('you are not allowed to do that')
        }
    })
}


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } 