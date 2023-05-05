const { Model } = require('objection')
const _ = require('lodash')

class BaseModel extends Model {

    static modifiers = {
        defaultSoftDelete(query) {
            query.whereNull('deleted')
        }
    }

    async softDelete() {
        return await this.$query().patchAndFetch({
            deleted: new Date()
        })
    }

    get $secureFields() {
        return []
    }

    $formatJson(json) {
        json = super.$formatJson(json)
        return _.omit(json, this.$secureFields)
    }
}

module.exports = BaseModel