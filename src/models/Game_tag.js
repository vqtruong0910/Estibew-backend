const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Game_tag extends BaseModel {
    static tableName = 'game_tag'

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['gameId', 'tagId'],
            properties: {
                id: { type: 'integer' },
                gameId: { type: 'integer' },
                tagId: { type: 'integer' },
            }
        }
    }

}

module.exports = Game_tag