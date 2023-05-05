const express = require('express')
const Game = require('../../models/Game');
const Game_tag = require('../../models/Game_tag');
const filterService = require('../../services/filterService');
const router = express.Router()

router.get('/', async (req, res) => {
    const reqQuery = req.query;
    const { _sort, _order, _page, _limit, _embed, _tags } = reqQuery

    try {
        const _tagsArr = _tags ? _tags.split('|') : []
        let game_tag = await Game_tag.query().select('gameId').where(function () {
            _tagsArr.forEach(item => {
                this.orWhere('tagId', item)
            });
        })
        game_tag = game_tag.map(item => item.gameId) // OnlyNumberArray: [1,2,3,4]
        const gameIds = []
        game_tag.forEach(value => {
            const isEqual_TagsArrLength = game_tag.filter(i => i === value).length === _tagsArr.length; //If idLength = _tagsLength
            if (isEqual_TagsArrLength && !gameIds.includes(value)) //The game have all request Tags && NotDuplicate in gameIds[]
                gameIds.push(value)
        })

        // let query = _tags ? Tag.relatedQuery('games').for(_tags.split("|")).distinct('game.id') : Game.query()
        let query = Game.query()
        _tags && query.findByIds(gameIds) //If user request with tags
        query.modify('defaultSoftDelete')
            .modify('selectMany')
            .select(
                Game.relatedQuery('purchased').count().as('sold')
            )
            .withGraphFetched('tags')
            .modifyGraph('tags', builder => {
                builder.orderBy('name');
            })

        query = filterService(query, reqQuery, _sort, _order, _page, _limit, _embed)
        const result = await query

        // console.log(query.toKnexQuery().toSQL().toNative());
        res.status(200).json({
            data: _page ? result.results : result,
            total: _page ? result.total : result.length,
            totalPage: Math.ceil(result.total / (_limit ? +_limit : 12)),
            currentPage: +_page,
            pageSize: +_limit
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = Game.query()
        query.findById(req.params.id)
            .withGraphFetched('developer')
            .withGraphFetched('publisher')
            .withGraphFetched('tags')
            .modifyGraph('tags', builder => {
                builder.orderBy('name');
            })
            .withGraphFetched('reviews')
            .modifyGraph('reviews', builder => {
                builder.withGraphFetched('belongToUser(selectSoftInfo)').orderBy('created', 'desc');
            })
            .withGraphFetched('requirement')

        const result = await query

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            code: 400,
            message: error.toString(),
        })
    }
})

module.exports = router