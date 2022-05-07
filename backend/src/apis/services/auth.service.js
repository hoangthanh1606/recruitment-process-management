const httpStatus = require('http-status')

const tokenService = require('./token.service')
const userService = require('./user.service')
const Jwt = require('jsonwebtoken');
const accountService = require('./account.service');

const ApiError = require('../../utils/api-error')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email)
    return user
}

/**
 * Account login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
 const accountLoginWithEmailAndPassword = async (email, password) => {
    const account = await accountService.getAccountByEmail(email)
    if (!account || !(await account.isPasswordMatch(password))) {
      return false;
    }
    return account
}


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<boolean>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
    return true
}

/**
 * Generate Tokens
 */
 const signToken = (userId) => {
    return Jwt.sign(
      {
        issues: "TAM-Application",
        subject: userId,
      },
      process.env.SECRET_KEY,
      { expiresIn: "86400s" }
    );
  };

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    signToken,
    accountLoginWithEmailAndPassword
}
