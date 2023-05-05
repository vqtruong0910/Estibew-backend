const express = require('express');
const Purchased = require('../../models/Purchased');
const router = express.Router()
const setting = require('../../setting/env')
const stripe = require('stripe')(setting.STRIPE.PRIVATE_KEY)
const SocketIOServer = require('../../services/socketio');
const Notification = require('../../models/Notification');

router.post('/create', async (req, res) => {
    const games = req.body.cart;
    const line_items = games.map(game => {
        return {
            price_data: {
                currency: "usd",
                product_data: {
                    name: game.name,
                    description: "Buy game from Estibew",
                    images: [game.image],
                    metadata: { userId: req.user.id, gameId: +game.id }
                },
                unit_amount: (game.price * 100).toFixed(0),
            },
            quantity: 1,
        }
    })

    try {
        //Check is Products boutght?
        let query = Purchased.query().where('userId', req.user.id)
        const result1 = await query
        const gameIds = result1.map((item) => item.gameId)
        games.forEach(game => {
            if (gameIds.includes(game.id))
                throw new Error(`You already purchased ${game.name}, please remove it in your cart!`)
        });

        //Create payment pages
        const result2 = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: line_items,
            success_url: req.body.success,
            cancel_url: req.body.cancel,
        })
        res.status(200).json(result2)
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.get('/verify', async function (req, res) {
    const { id } = req.query
    try {
        const sessions = await stripe.checkout.sessions.retrieve(id);
        if (sessions.payment_status === 'paid' && sessions.status === 'complete') {
            const list = await stripe.checkout.sessions.listLineItems(
                id, { expand: ['data.price.product'], }
            );
            let purchased = list.data.map(item => item.price.product.metadata)

            //Check if user send paymentID which one was paid and success!
            let query = Purchased.query().where('userId', req.user.id)
            const result = await query
            const gameIds = result.map((item) => item.gameId)
            purchased = purchased.map(item => {
                if (gameIds.includes(+item.gameId))
                    throw new Error('PAYID_SESSSION_EXPIRED')
                return { gameId: +item.gameId, userId: +item.userId }
            });
            await Purchased.query().insert(purchased)

            let content = 'You have purchased:\n';
            let total = 0;
            list.data.forEach(item => {
                content += `${item.description} - ${(item.amount_total / 100).toFixed(2)}$\n`
                total += +(item.amount_total / 100).toFixed(2)
            })
            content += `Total is ${total.toFixed(2)}$`

            const notification = await Notification.query().insertAndFetch({
                sender: "System",
                title: `Thank for your purchased, total is ${total.toFixed(2)}$. Download games in profile`,
                content,
                image: `${setting.SERVER_URL}/pay.jpg`,
                userId: req.user.id
            })
            const io = SocketIOServer.getIO()
            io.to(req.user.id.toString()).emit('notification', {
                notification
            })

            res.status(200).json({ success: true })
        } else {
            throw new Error('PAYMENT_UNFINISH')
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

module.exports = router
