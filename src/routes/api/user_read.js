const express = require('express')
const UserRead = require('../../models/UserRead');
const router = express.Router()

router.post('/read', async (req, res) => {
    try {
        let query = UserRead.query().patchAndFetchById(req.user.id, {
            lastRead: new Date()
        })
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