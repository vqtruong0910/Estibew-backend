const express = require('express');
const moment = require('moment/moment');
const Client = require('../../../models/Client');
const Purchased = require('../../../models/Purchased');
const User = require('../../../models/User');
const router = express.Router()

router.get('/purchased', async function (req, res) {
    const { time } = req.query;
    try {
        const start = moment().startOf(time);
        const end = moment().endOf(time);

        const previousStart = moment().startOf(time).subtract(1, time);
        const previousEnd = moment().endOf(time).subtract(1, time);

        let result = await Purchased.query()
            .where('created', '>=', start)
            .andWhere('created', '<=', end)
            .distinctOn("gameId")
            .withGraphFetched("belongToGame")
            .modifyGraph('belongToGame', builder => {
                builder.select('id', 'name', 'price', 'released')
                    .withGraphFetched('tags')
                    .withGraphFetched('purchased')
                    .modifyGraph('purchased', builder => {
                        builder.where('created', '>=', start)
                            .andWhere('created', '<=', end)
                    })
            })
        let resultOld = await Purchased.query()
            .where('created', '>=', previousStart)
            .andWhere('created', '<=', previousEnd)
            .distinct("gameId")
            .withGraphFetched("belongToGame")
            .modifyGraph('belongToGame', builder => {
                builder.select('id', 'name', 'price', 'released')
                    .withGraphFetched('tags')
                    .withGraphFetched('purchased')
                    .modifyGraph('purchased', builder => {
                        builder.where('created', '>=', previousStart)
                            .andWhere('created', '<=', previousEnd)
                    })
            })
        let total = 0;
        let totalOld = 0;
        result = result.map(item => {
            var totalItem = +(item.belongToGame.purchased.length * item.belongToGame.price).toFixed(2)
            total += totalItem
            return (
                { total: totalItem, quantity: item.belongToGame.purchased.length, ...item }
            )
        })
        result = result.map(item => {
            return (
                { scale: +((item.total / total) * 100).toFixed(2), ...item }
            )
        })
        resultOld.forEach(item => {
            totalOld += +(item.belongToGame.purchased.length * item.belongToGame.price).toFixed(2)
        })
        //SORT RESULT BY TOTAL PURCHASED PER ITEM
        result.sort(function(a, b) {
            return b.total - a.total
        });
        let growth = totalOld !== 0 ? +((total - totalOld) / totalOld * 100).toFixed(2) : null
        if (growth && total === 0) growth = 0;
        res.status(200).json({
            start,
            end,
            total: +total.toFixed(2),
            totalOld: +totalOld.toFixed(2),
            growth,
            result
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

router.get('/account', async function (req, res) {
    const { time } = req.query;
    try {
        const start = moment().startOf(time);
        const end = moment().endOf(time);

        const previousStart = moment().startOf(time).subtract(1, time);
        const previousEnd = moment().endOf(time).subtract(1, time);

        let result = await User.query()
            .where('created', '>=', start)
            .andWhere('created', '<=', end)
            .orderBy('created', 'desc')
        let resultOld = await User.query()
            .where('created', '>=', previousStart)
            .andWhere('created', '<=', previousEnd)
        let total = result.length;
        let totalOld = resultOld.length;
        let growth = totalOld !== 0 ? +((total - totalOld) / totalOld * 100).toFixed(2) : null
        if (growth && total === 0) growth = 0;
        let totalEstibew = 0
        let totalGoogle = 0
        let totalFacebook = 0
        result.forEach(item => {
            if (item.provider === "facebook") totalFacebook += 1
            else if (item.provider === "google") totalGoogle += 1
            else totalEstibew += 1
        })
        res.status(200).json({
            start,
            end,
            total,
            totalOld,
            totalEstibew,
            totalGoogle,
            totalFacebook,
            estibewScale: (totalEstibew === 0 && total === 0) ? 0 : totalEstibew / total * 100,
            googleScale: (totalGoogle === 0 && total === 0) ? 0 : totalGoogle / total * 100,
            facebookScale: (totalFacebook === 0 && total === 0) ? 0 : totalFacebook / total * 100,
            growth,
            result,
            resultOld
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

router.get('/client', async function (req, res) {
    const { time } = req.query;
    try {
        const start = moment().startOf(time);
        const end = moment().endOf(time);

        const previousStart = moment().startOf(time).subtract(1, time);
        const previousEnd = moment().endOf(time).subtract(1, time);

        let result = await Client.query()
            .where('created', '>=', start)
            .andWhere('created', '<=', end)
        let resultOld = await Client.query()
            .where('created', '>=', previousStart)
            .andWhere('created', '<=', previousEnd)
        let total = result.length;
        let totalOld = resultOld.length;
        let growth = totalOld !== 0 ? +((total - totalOld) / totalOld * 100).toFixed(2) : null
        if (growth && total === 0) growth = 0;
        let totalGuest = 0
        let totalAccount = 0
        result.forEach(item => {
            if (item.userId) totalAccount += 1
            else totalGuest += 1
        })
        res.status(200).json({
            start,
            end,
            total,
            totalOld,
            totalGuest,
            totalAccount,
            guestScale: (totalGuest === 0 && total === 0) ? 0 : totalGuest / total * 100,
            accountScale: (totalAccount === 0 && total === 0) ? 0 : totalAccount / total * 100,
            growth,
            result,
            resultOld
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

module.exports = router