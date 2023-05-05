const BaseModel = require("./BaseModel");

class Client extends BaseModel {
    static tableName = 'client'

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                userId: { type: 'string' },
                provider: { type: 'string' },
                ip: { type: 'string' },
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

module.exports = Client