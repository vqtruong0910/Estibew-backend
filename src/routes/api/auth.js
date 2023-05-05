const express = require('express');
const User = require('../../models/User');
const router = express.Router()
const jwt = require('jsonwebtoken');
const middleware = require('../../middleware');
const { sendVerifyLink, sendNewPasswordLink } = require('../../services/nodemailer');
const setting = require('../../setting/env');
const Privacy = require('../../models/Privacy');
const UserRead = require('../../models/UserRead');
const Notification = require('../../models/Notification');
const SocketIOServer = require('../../services/socketio');

router.post('/login', async (req, res) => {
    const { admin } = req.query
    try {
        const { email, password } = req.body
        if (email === '' || password === '') throw new Error('Please enter email and password')

        const user = await User.query().findOne({ email: email, provider: null, providerId: null })
        if (!user || !User.validPassword(password, user.password)) {
            throw new Error('Invalid user')
        } else if (!user.isEmailVerified) {
            sendVerifyLink(req, res, user)
            throw new Error('Unverified email')
        } else if (user.banned) {
            throw new Error('User banned')
        }

        if(user.role === 0 && admin==='yes') {
            throw new Error('Invalid admin account')
        }

        res.status(200).json({
            success: true,
            token: user.toJsonWithToken(),
            message: "Login successfully",
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            code: 401,
            message: error.toString(),
        })
    }
})

router.post('/register', async (req, res) => {

    try {
        const { email, password } = req.body
        const emailExist = await User.query().where({ email, provider: null, providerId: null }).first()
        if (emailExist) {
            throw new Error('This email is already in use!')
        } else {
            const newUser = await User.query().insertAndFetch({
                email,
                username: `Estibew${Date.now()}`,
                password: User.generateHash(password)
            })
            await Privacy.query().insert({
                userId: newUser.id
            })
            await UserRead.query().insert({
                userId: newUser.id
            })

            sendVerifyLink(req, res, newUser)

            res.status(200).json({
                success: true,
                code: 200,
                message: "Account created successfully, go to your mailbox to verify",
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.get('/verify_email', (req, res) => {
    try {
        jwt.verify(req.query.token, setting.JWT_SECRET, async function (error, decoded) {
            if (error) res.status(400).json(error)
            await User.query().update({ isEmailVerified: true }).where('id', decoded.id)
            res.status(200).send('<h1>Account verified! You can use this account to sign in</h1>')
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get-me', middleware.restrict, async (req, res) => {
    const user = await User.query().findOne({ id: req.user.id })
        .withGraphFetched('notification')
        .modifyGraph('notification', builder => {
            builder.orderBy('created', 'DESC').limit(5)
        })
        .withGraphFetched('user_read')
    res.status(200).json(user)
})

router.post('/forgot_password', async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.query().findOne({ email: email, provider: null, providerId: null })
        if (user) {
            if (!user.isEmailVerified) {
                sendVerifyLink(req, res, user)
                throw new Error('Unverified email')
            } else if (user.banned) {
                throw new Error('User banned')
            }
            sendNewPasswordLink(req, res, user)

            const notification = await Notification.query().insertAndFetch({
                sender: "System",
                title: `Forgot password email was sent to your mailbox! Some one try to change your password!`,
                content: `Some one try to change your password. If not you, please change a password that is hard to guess!`,
                image: `${setting.SERVER_URL}/key.jpg`,
                userId: user.id
            })
            const io = SocketIOServer.getIO()
            io.to(user.id.toString()).emit('notification', {
                notification
            })

        } else {
            throw new Error("Invalid user!")
        }
        res.status(200).json({
            success: true,
            message: "Please check your mailbox to change your password!",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.post('/update_password', middleware.restrict, async (req, res) => {
    try {
        const { password, confirm, oldPassword } = req.body
        if (password !== confirm) throw new Error("Password and confirm doesn't match!")
        const user = await User.query().findOne({ id: req.user.id, provider: null, providerId: null })

        const notification = await Notification.query().insertAndFetch({
            sender: "System",
            title: `Some one try to change your password. Is that you you?`,
            content: `Some one try to change your password. If not you, please change a password that is hard to guess!`,
            image: `${setting.SERVER_URL}/key.jpg`,
            userId: req.user.id
        })
        const io = SocketIOServer.getIO()
        io.to(req.user.id.toString()).emit('notification', {
            notification
        })

        if(req.headers['old-to-new']){
            if(!User.validPassword(oldPassword, user.password)) throw new Error("Your current password isn't correct!")
        }
        if (user) await User.query().update({ password: User.generateHash(password) }).where('id', user.id)
        else throw new Error("Unexpected error!")

        res.status(200).json({
            success: true,
            message: "Password changed! Now you can login with new password",
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})



module.exports = router