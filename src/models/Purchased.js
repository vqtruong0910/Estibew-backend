const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Purchased extends BaseModel {
    static tableName = 'purchased'

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['gameId', 'userId'],
            properties: {
                id: { type: 'integer' },
                gameId: { type: 'integer' },
                userId: { type: 'integer' },
            }
        }
    }

    static get relationMappings() {
        const Game = require("./Game");
        return {
            belongToGame: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'purchased.gameId',
                    to: 'game.id',
                },
            }
        }
    }
}

module.exports = Purchased