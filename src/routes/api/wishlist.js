const express = require('express')
const Wishlist = require('../../models/Wishlist');
const Notification = require('../../models/Notification');
const SocketIOServer = require('../../services/socketio');
const setting = require('../../setting/env')
const router = express.Router()

router.post('/create', async (req, res)=>{
    const { gameId } = req.body
    try {
        const query = Wishlist.query().where('userId', req.user.id)
        const result = await query;
        const gameIds = result.map((item) => item.gameId)
        if (gameIds.includes(gameId)) throw new Error("This game alreaday in wishlist")
        else await Wishlist.query().insert({
            userId: req.user.id,
            gameId,
        })
        res.status(200).json({
            success: true,
            message: "Successfully add to wishlist"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.toString()
        })
    }
})

router.delete('/:id/delete', async function (req, res) {
    const { id } = req.params
    try {
        const query = Wishlist.query().deleteById(id)
        await query

        const notification = await Notification.query().insertAndFetch({
            sender: "System",
            title: `You just deleted your wishItem. Click to see details...`,
            content: `You deleted your wish item.`,
            image: `${setting.SERVER_URL}/wish.jpg`,
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