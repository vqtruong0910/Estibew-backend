const User = require("../models/User");

const base = function (req, res, next) {
    next()
}

const checkin = async function (req, res, next) {
    const authHeader = req.headers['authorization']
    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1]
            const me = await User.findWithToken(token)
            req.user = me
            next()
        } catch (error) {
            res.status(401).json({
                success: false,
                message: "Unauthorized!",
            })
        }
    } else {
        next()
    }
}

const restrict = function (req, res, next) {
    if (req.user) {
        next()
    } else {
        res.status(401).json({ success: false, message: "Please sign in!" })
    }
}

const restrictAdmin = function (req, res, next) {
    if (req.user && req.user.role !== 0) {
        next()
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}

module.exports = { base, checkin, restrict, restrictAdmin }