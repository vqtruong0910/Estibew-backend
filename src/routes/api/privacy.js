const express = require('express');
const Privacy = require('../../models/Privacy');
const Notification = require('../../models/Notification');
const SocketIOServer = require('../../services/socketio');
const setting = require('../../setting/env')
const router = express.Router()

router.post('/:id/update', async function (req, res) {
    const { id } = req.params
    const data = req.body
    try {
        const obj = {
            [Object.keys(data)[0]]: data[Object.keys(data)[0]]
        }

        const query = Privacy.query().updateAndFetchById(id, obj);
        const result = await query
        
        const sendNoti = result.notificationSetting ? false : true
        if (sendNoti || Object.keys(data)[0] === 'notificationSetting') {
            const notification = await Notification.query().insertAndFetch({
                sender: "System",
                title: `You just updated your ${[Object.keys(data)[0]]} privacy. Make sure it's you`,
                content: `You updated your ${[Object.keys(data)[0]]} privacy. Check it in your setting.`,
                image: `${setting.SERVER_URL}/setting.jpg`,
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

module.exports = router 