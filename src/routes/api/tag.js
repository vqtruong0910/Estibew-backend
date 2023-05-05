const express = require('express')
const Tag = require('../../models/Tag');
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let query = Tag.query().orderBy('name')
        const result = await query

        // console.log(query.toKnexQuery().toSQL().toNative());
        res.status(200).json(result)
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