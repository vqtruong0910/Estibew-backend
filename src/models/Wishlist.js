const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Wishlist extends BaseModel {
    static tableName = 'wishlist'

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
                    from: 'wishlist.gameId',
                    to: 'game.id',
                },
            }
        }
    }
}

module.exports = Wishlist