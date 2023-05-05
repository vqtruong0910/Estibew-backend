const BaseModel = require("./BaseModel");

class Privacy extends BaseModel {
    static tableName = 'privacy'

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                userId: { type: 'integer' }
            }
        }
    }
}

module.exports = Privacy