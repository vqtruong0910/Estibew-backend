const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Review extends BaseModel {
    static tableName = 'review'

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['gameId', 'userId'],
            properties: {
                id: { type: 'integer' },
                comment: { type: 'string', maxLength: 5000  },
                like: { type: 'boolean' },
                gameId: { type: 'integer' },
                userId: { type: 'integer' },
            }
        }
    }

    static get relationMappings() {
        const Game = require("./Game");
        const User = require("./User");
        return {
            belongToGame: {
                relation: Model.BelongsToOneRelation,
                modelClass: Game,
                join: {
                    from: 'review.gameId',
                    to: 'game.id',
                },
            },
            belongToUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'review.userId',
                    to: 'user.id',
                },
            }
        }
    }
}

module.exports = Review