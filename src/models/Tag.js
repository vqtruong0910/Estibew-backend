const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Tag extends BaseModel {
    static tableName = 'tag'

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
            }
        }
    }

    static get relationMappings() {
        const Game = require("./Game");
        return {
            games: {
                relation: Model.ManyToManyRelation,
                modelClass: Game,
                join: {
                    from: 'tag.id',
                    through: {
                        from: 'game_tag.tagId',
                        to: 'game_tag.gameId',
                    },
                    to: 'game.id',
                },
            }
        }
    }
}

module.exports = Tag