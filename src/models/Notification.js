const { Model } = require("objection");
const BaseModel = require("./BaseModel");

class Notification extends BaseModel {
    static tableName = 'notification'

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['userId'],
            properties: {
                id: { type: 'integer' },
                content: { type: 'string' },
                title: { type: 'string' },
                sender: { type: 'string' },
                image: { type: 'string' },
                userId: { type: 'integer' },
            }
        }
    }

    // static get relationMappings() {
    //     const User = require("./User");
    //     return {
    //         belongToGame: {
    //             relation: Model.BelongsToOneRelation,
    //             modelClass: User,
    //             join: {
    //                 from: 'notification.userId',
    //                 to: 'user.id',
    //             },
    //         }
    //     }
    // }
}

module.exports = Notification