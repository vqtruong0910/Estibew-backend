const express = require('express')
const Notification = require('../../models/Notification');
const filterService = require('../../services/filterService');
const router = express.Router()

router.get('/', async function (req, res) {
    const reqQuery = req.query;
    const { _sort, _order, _page, _limit, _embed } = reqQuery

    try {
        let query = Notification.query().where('userId', req.user.id)
        query = filterService(query, reqQuery, _sort, _order, _page, _limit, _embed)
        const result = await query

        res.status(200).json({
            data: _page ? result.results : result,
            total: _page ? result.total : result.length,
            totalPage: Math.ceil(result.total / (_limit ? +_limit : 12)),
            currentPage: +_page,
            pageSize: +_limit,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.delete('/delete', async function (req, res) {
    try {
        const deletedNumber = await Notification.query().delete().whereIn('id', req.body)
        console.log(deletedNumber);
        res.status(200).json({
            success: true,
            message: `Delete ${deletedNumber} item${deletedNumber>1 ? 's':''} successfully`
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