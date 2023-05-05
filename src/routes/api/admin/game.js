const express = require('express');
const Developer = require('../../../models/Developer');
const Game = require('../../../models/Game');
const Game_tag = require('../../../models/Game_tag');
const Publisher = require('../../../models/Publisher');
const Requirement = require('../../../models/Requirement');
const Tag = require('../../../models/Tag');
const parser = require('../../../services/cloudinary');
const filterService = require('../../../services/filterService');
const router = express.Router()

router.get('/', async function (req, res) {
    const reqQuery = req.query;
    const { _sort, _order, _page, _limit, _embed } = reqQuery

    try {
        let query = Game.query()
        query = filterService(query, reqQuery, _sort, _order, _page, _limit, _embed)
        query.withGraphFetched('tags')
            .withGraphFetched('developer')
            .withGraphFetched('publisher')
            .withGraphFetched('requirement')
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

router.post('/create', parser.single('gameImg'), async function (req, res) {
    const { newGameId } = req.query
    const { name, released, price, image, file, size, intro, os, processor, memory, graphic, directx, storage, tags, publishers, developers } = req.body;
    const gameObj = { name, released, price, image, size, file, intro }
    try {
        let query = null;
        if (req.file) query = Game.query().updateAndFetchById(newGameId, { image: req.file.path })
        else query = Game.query().insertAndFetch(gameObj)
        const result = await query
        if (!req.file) {
            let tagArr = tags.split(",")
            tagArr = tagArr.map(tag => tag.trim())
            tagArr.forEach(async tag => {
                let findTag = await Tag.query().where('name', tag)
                if (findTag.length < 1) {
                    const newTag = await Tag.query().insertAndFetch({ name: tag })
                    findTag.push(newTag)
                }
                await Game_tag.query().insert({ gameId: result.id, tagId: findTag[0].id })
            });
            const numberEffect = await Requirement.query().insert({ os, processor, memory, graphic, directx, storage, gameId: result.id })
            console.log(numberEffect);
            await Developer.query().insert({ name: developers, gameId: result.id })
            await Publisher.query().insert({ name: publishers, gameId: result.id })
        }
        res.status(200).json({
            success: true,
            code: 200,
            newGameId: result.id,
            message: "Create successfully!"
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

router.put('/:id/update', parser.single('gameImg'), async function (req, res) {
    const { id } = req.params
    const { name, released, price, image, file, size, intro, os, processor, memory, graphic, directx, storage, tags, publishers, developers } = req.body;
    const gameObj = { name, released, price, image, size, file, intro }
    try {
        const query = Game.query().updateAndFetchById(id, req.file ? { image: req.file.path } : gameObj)
        const result = await query
        if (!req.file) {
            await Game_tag.query().delete().where('gameId', result.id)
            let tagArr = tags.split(",")
            tagArr = tagArr.map(tag => tag.trim())
            tagArr.forEach(async tag => {
                let findTag = await Tag.query().where('name', tag)
                if (findTag.length < 1) {
                    const newTag = await Tag.query().insertAndFetch({ name: tag })
                    findTag.push(newTag)
                }
                await Game_tag.query().insert({ gameId: result.id, tagId: findTag[0].id })
            });
            const numberEffect = await Requirement.query().update({ os, processor, memory, graphic, directx, storage }).where('gameId', result.id)
            console.log(numberEffect);
            await Developer.query().update({ name: developers }).where('gameId', result.id)
            await Publisher.query().update({ name: publishers }).where('gameId', result.id)
        }
        res.status(200).json({
            success: true,
            code: 200,
            message: "Update successfully!"
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

router.put('/:id/delete', async function (req, res) {
    const { id } = req.params
    try {
        const day = new Date()
        const query = Game.query().updateAndFetchById(id, { deleted: day })
        const result = await query
        res.status(200).json({
            success: true,
            code: 200,
            message: `Delete ${result.name} successfully`
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