const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require("passport");
const express = require('express');
const User = require('../../models/User');
const setting = require('../../setting/env');
const Privacy = require('../../models/Privacy');
const UserRead = require('../../models/UserRead');
const cloudinary = require('cloudinary').v2
const router = express.Router()

passport.use(new FacebookStrategy({
    clientID: "432865272316303",
    clientSecret: "e0c098b4f5d0efddbe70a9b9a69f56ab",
    callbackURL: `${setting.CLIENT_URL}/auth/facebook`,
    profileFields: ['id', 'displayName', 'gender', 'picture.type(large)', 'email']
},
    async function (accessToken, refreshToken, user, cb) {
        console.log(user);
        const me = await User.findWithProviderId(user.id)
        if (me) {
            cb(null, me)
        } else {
            let avatar = ''
            cloudinary.uploader.upload(user.photos[0].value, {
                public_id: 'facebook_avatar' + Date.now(),
                folder: 'Estibew'
            }).then(async function (result) {
                const newUser = await User.query().insertAndFetch({
                    email: user.emails[0].value,
                    provider: user.provider,
                    providerId: user.id,
                    username: user.displayName,
                    avatar: result.url
                })
                await Privacy.query().insert({
                    userId: newUser.id
                })
                await UserRead.query().insert({
                    userId: newUser.id
                })
                cb(null, newUser)
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
))

router.get('/', passport.authenticate('facebook', {
    session: false,
    scope: ['email']
}));

router.get('/callback', passport.authenticate('facebook', {
    session: false,
    failureRedirect: `${setting.CLIENT_URL}/404`,
}),
    function (req, res) {
        if (req.user.banned) {
            res.status(400).json({
                success: false,
                message: "Sorry you was banned, please contact to admin!"
            })
        } else {
            res.status(200).json({
                success: true,
                token: req.user.toJsonWithToken()
            })
        }
    }
)

module.exports = router