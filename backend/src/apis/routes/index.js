const express = require('express')

const authRoute = require('./v1/auth.route')
const taskRoute = require('./v1/task.route')
const userRoute = require('./v1/user.route')
const campaignRoute = require('./v1/campaign.route')
const profileRoute = require('./v1/profile.route')
const uploadRoute = require('./v1/upload.route')
const mailRoute = require('./v1/mail.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/v1/auth',
        route: authRoute,
    },
    {
        path: '/v1/tasks',
        route: taskRoute,
    },
    {
        path: '/v1/users',
        route: userRoute,
    },
    {
        path: '/v1/campaign',
        route: campaignRoute,
    },
    {
        path: '/v1/profile',
        route: profileRoute,
    },
    {
        path: '/v1/upload',
        route: uploadRoute,
    },
    {
        path: '/v1/mail',
        route: mailRoute,
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
