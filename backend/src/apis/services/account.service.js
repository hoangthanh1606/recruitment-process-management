const { Account } = require('../models')


/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<Account>}
 */
const getAccountByEmail = async (email) => {
    return Account.findOne({ email })
}

module.exports = {
    getAccountByEmail,
}
