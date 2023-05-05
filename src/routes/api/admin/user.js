const express = require('express');
const User = require('../../../models/User');
const filterService = require('../../../services/filterService');
const router = express.Router()

router.get('/', async function (req, res) {
    const reqQuery = req.query;
    const { _sort, _order, _page, _limit, _embed } = reqQuery

    try {
        let query = User.query().where('role', 0)
        query = filterService(query, reqQuery, _sort, _order, _page, _limit, _embed)
        query.orderBy('id', 'ASC')
        let result = await query;
        res.status(200).json({
            data: _page ? result.results : result,
            total: _page ? result.total : result.length,
            totalPage: Math.ceil(result.total / (_limit ? +_limit : 12)),
            currentPage: +_page,
            pageSize: +_limit,
            success: true
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

router.put('/:id/ban', async (req, res) => {
    try {
        let query = User.query().updateAndFetchById(req.params.id, { banned: true })
        const result = await query
        res.status(200).json({
            success: true,
            code: 200,
            message: `User with id ${result.id} has been banned`
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

router.put('/:id/unban', async (req, res) => {
    try {
        let query = User.query().updateAndFetchById(req.params.id, { banned: false })
        const result = await query
        res.status(200).json({
            success: true,
            code: 200,
            message: `Unban user with id ${result.id} successfully!`
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