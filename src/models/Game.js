const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Game extends BaseModel {
    static tableName = 'game'

    static modifiers = {
        ...BaseModel.modifiers,
        selectMany(query) {
            const { ref } = Game;
            query.select(
                ref('id'),
                ref('name'),
                ref('price'),
                ref('image'),
                ref('size'),
                ref('file'),
                ref('released'),
                ref('updated'),
                ref('created'),
            )
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                price: { type: 'number' },
                image: { type: 'string' },
                intro: { type: 'string', minLength: 1, maxLength: 10000 }
            }
        }
    }

    static get relationMappings() {
        const Tag = require("./Tag");
        const Purchased = require("./Purchased");
        const Review = require("./Review");
        const Requirement = require("./Requirement");
        const Developer = require("./Developer");
        const Publisher = require("./Publisher");

        return {
            developer: {
                relation: Model.HasManyRelation,
                modelClass: Developer,
                join: {
                    from: 'game.id',
                    to: 'developer.gameId'
                }
            },
            publisher: {
                relation: Model.HasManyRelation,
                modelClass: Publisher,
                join: {
                    from: 'game.id',
                    to: 'publisher.gameId'
                }
            },
            purchased: {
                relation: Model.HasManyRelation,
                modelClass: Purchased,
                join: {
                    from: 'game.id',
                    to: 'purchased.gameId'
                }
            },
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: Tag,
                join: {
                    from: 'game.id',
                    through: {
                        from: 'game_tag.gameId',
                        to: 'game_tag.tagId',
                    },
                    to: 'tag.id',
                },
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'game.id',
                    to: 'review.gameId'
                }
            },
            requirement: {
                relation: Model.HasOneRelation,
                modelClass: Requirement,
                join: {
                    from: 'game.id',
                    to: 'requirement.gameId'
                }
            },
        }
    }
}

module.exports = Game