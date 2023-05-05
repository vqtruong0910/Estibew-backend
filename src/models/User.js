const { Model } = require("objection");
const BaseModel = require("./BaseModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const setting = require('../setting/env');

class User extends BaseModel {
    static tableName = 'user'

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['email', 'password'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                gender: { type: 'string' },
                phone: { type: 'string' },
                avatar: { type: 'string' },
                bio: { type: 'string', maxLength: 1000 },
            }
        }
    }

    static modifiers = {
        ...BaseModel.modifiers,
        selectSoftInfo(query) {
            const { ref } = User;
            query.select(
                ref('id'),
                ref('username'),
                ref('avatar'),
            )
        },
        defaultSelects(query) {
            const { ref } = User
            query.select(
                ref('id'),
                ref('username'),
                ref('email'),
                ref('isEmailVerified'),
                ref('gender'),
                ref('phone'),
                ref('avatar'),
                ref('bio'),
                ref('interests'),
                ref('country'),
                ref('city'),
                ref('provider'),
                ref('providerId'),
                ref('birthday'),
                ref('banned'),
                ref('deleted'),
                ref('role'),
                ref('lastActivedAt'),
                ref('created'),
                ref('updated')
            )
        }
    }

    get $secureFields() {
        return ['password']
    }

    static get relationMappings() {
        const Purchased = require("./Purchased");
        const Wishlist = require("./Wishlist");
        const Review = require("./Review");
        const Privacy = require("./Privacy");
        const Notification = require("./Notification");
        const UserRead = require("./UserRead");
        return {
            purchased: {
                relation: Model.HasManyRelation,
                modelClass: Purchased,
                join: {
                    from: 'user.id',
                    to: 'purchased.userId',
                },
            },
            wishlist: {
                relation: Model.HasManyRelation,
                modelClass: Wishlist,
                join: {
                    from: 'user.id',
                    to: 'wishlist.userId',
                },
            },
            review: {
                relation: Model.HasManyRelation,
                modelClass: Review,
                join: {
                    from: 'user.id',
                    to: 'review.userId',
                },
            },
            privacy: {
                relation: Model.HasManyRelation,
                modelClass: Privacy,
                join: {
                    from: 'user.id',
                    to: 'privacy.userId',
                },
            },
            notification: {
                relation: Model.HasManyRelation,
                modelClass: Notification,
                join: {
                    from: 'user.id',
                    to: 'notification.userId',
                },
            },
            user_read: {
                relation: Model.HasManyRelation,
                modelClass: UserRead,
                join: {
                    from: 'user.id',
                    to: 'user_read.userId',
                },
            },
        }
    }

    toJsonWithToken() {
        const token = jwt.sign({
            id: this.id,
        }, setting.JWT_SECRET)

        return token
    }

    toJsonWithExpireToken() {
        const token = jwt.sign({
            id: this.id,
        }, setting.JWT_SECRET, { expiresIn: 60 })

        return token
    }

    static generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    static validPassword(input, password) {
        return bcrypt.compareSync(input, password)
    }

    static async findWithProviderId(id) {
        const me = await User.query().modify('defaultSoftDelete').findOne({ providerId: id })
        return me
    }

    static async findWithToken(token) {
        const decoded = User.decodeToken(token)
        if (decoded) {
            const me = await User.query()
                .modify('defaultSoftDelete')
                .patchAndFetchById(decoded.id, { lastActivedAt: new Date() })
            return me
        }
        return null
    }

    static decodeToken(token) {
        return jwt.verify(token, setting.JWT_SECRET)
    }
}

module.exports = User