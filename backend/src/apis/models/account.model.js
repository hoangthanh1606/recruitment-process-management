const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { toJSON } = require('./plugins')

const accountSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

accountSchema.plugin(toJSON)

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
accountSchema.methods.isPasswordMatch = async function (password) {
    const account = this
    return bcrypt.compare(password, account.password)
}

const Account = mongoose.model('Account', accountSchema)

module.exports = Account
