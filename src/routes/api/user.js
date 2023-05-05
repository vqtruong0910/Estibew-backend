const express = require('express');
const { restrict } = require('../../middleware');
const User = require('../../models/User');
const parser = require('../../services/cloudinary');
const router = express.Router()
const path = require('path');
const Purchased = require('../../models/Purchased');
const SocketIOServer = require('../../services/socketio');
const Notification = require('../../models/Notification');
const setting = require('../../setting/env');
const Privacy = require('../../models/Privacy');

router.get('/:id', async (req, res) => {
    try {
        let query = User.query()
        query.findById(req.params.id)
            .modify('defaultSelects')
            .withGraphFetched('purchased')
            .modifyGraph('purchased', builder => {
                builder.select('created as purchasedDate').withGraphFetched('belongToGame(selectMany)')
                    .orderBy('purchasedDate', 'desc')
            })
            .withGraphFetched('wishlist')
            .modifyGraph('wishlist', builder => {
                builder.select('id', 'created').withGraphFetched('belongToGame(selectMany)')
                    .orderBy('created', 'desc')
            })
            .withGraphFetched('review')
            .modifyGraph('review', builder => {
                builder.select('*').withGraphFetched('belongToGame(selectMany)')
                    .orderBy('created', 'desc')
            })
            .withGraphFetched('privacy')
            .withGraphFetched('notification')

        let result = await query
        let viewMode = req.user?.id == req.params.id ? false : true
        if (viewMode) {
            if (result.privacy[0].info) result = { ...result, email: "*********", phone: "*********" }
            if (result.privacy[0].wishlist) result = { ...result, wishlist: [] }
            if (result.privacy[0].purchased) result = { ...result, purchased: [] }
            if (result.privacy[0].review) result = { ...result, review: [] }
            if (result.privacy[0].profile) throw new Error("User cant be found")
            result = { ...result, privacy: "*********" }
        }
        res.status(200).json({
            user: result,
            viewMode
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.put('/:id/update', restrict, parser.single('avatar'), async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const obj = {
            [req.file ? 'avatar' : Object.keys(data)[0]]: req.file ? req.file.path : data[Object.keys(data)[0]]
        }
        if (Object.keys(data)[0] === "username" && data[Object.keys(data)[0]].length > 20) {
            throw new Error("Your name cannot be longer than 20 characters")
        }
        const query = User.query().modify('defaultSelects').updateAndFetchById(id, obj);
        const result = await query

        const privacy = await Privacy.query().findOne({ userId: id });
        const sendNoti = privacy.notificationInfo ? false : true
        if (sendNoti) {
            let content = '';
            req.file ?
                content = `You just updated your avatar. Check it on your profile` :
                content = `You updated your ${Object.keys(data)[0]}.\nDetails: from ${req.user[Object.keys(data)[0]] || 'none'} to ${data[Object.keys(data)[0]]}`

            const notification = await Notification.query().insertAndFetch({
                sender: "System",
                title: `You just updated your ${req.file ? 'avatar' : Object.keys(data)[0]}. Click to see detail...`,
                content,
                image: `${setting.SERVER_URL}/infomation.jpg`,
                userId: req.user.id
            })
            const io = SocketIOServer.getIO()
            io.to(req.user.id.toString()).emit('notification', {
                notification
            })
        }

        res.status(200).json({
            data: result,
            success: true,
            message: "Update successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.toString(),
        })
    }
})

router.get('/download/:gameId', restrict, async (req, res) => {
    try {
        const query = Purchased.query().where({ gameId: req.params.gameId, userId: req.user.id })
        const result = await query
        if (result.length > 0) res.status(200).download(path.join(__dirname, '../../../public/installation', 'game.exe'));
        else throw new Error("Unexpected error....")
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.toString(),
        })
    }
})

module.exports = router