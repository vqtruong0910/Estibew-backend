const express = require('express')
const Review = require('../../models/Review');
const Notification = require('../../models/Notification');
const SocketIOServer = require('../../services/socketio');
const setting = require('../../setting/env')
const router = express.Router()

router.post('/create', async function (req, res) {
    try {
        const { comment, like, gameId, gameName, gameImg } = req.body
        if (!comment || like === undefined || !gameId) throw new Error("Missing parameter")
        const query = Review.query().insertAndFetch({ comment, gameId, like, userId: req.user.id })
        const result = await query;

        const notification = await Notification.query().insertAndFetch({
            sender: "System",
            title: `You comment in ${gameName} and you ${result.like? 'like': 'dont like'} it`,
            content: `Details:\n${result.comment}`,
            image: gameImg,
            userId: req.user.id
        })

        const io = SocketIOServer.getIO()
        io.to(req.user.id.toString()).emit('notification', {
            notification
        })

        res.status(200).json({
            belongToUser: {
                id: req.user.id,
                username: req.user.username,
                avatar: req.user.avatar
            },
            ...result
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.delete('/:id/delete', async function (req, res) {
    const { id } = req.params
    try {
        const query = Review.query().deleteById(id)
        await query

        const notification = await Notification.query().insertAndFetch({
            sender: "System",
            title: `You just deleted your review. Click to see details...`,
            content: `You deleted your review, it's can be restore anymore...`,
            image: `${setting.SERVER_URL}/review.jpg`,
            userId: req.user.id
        })

        const io = SocketIOServer.getIO()
        io.to(req.user.id.toString()).emit('notification', {
            notification
        })

        res.status(200).json({
            success: true,
            message: "Delete successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.toString()
        })
    }
})

module.exports = router 