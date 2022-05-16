const router = require('express').Router()
const {login,register, getUsers, refreshToken, logout, getUserInfo} = require('../contollers/userCtrl')
const auth = require('../middlewares/auth')

router.route('/').get(auth,getUsers)
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/refresh_token').get(refreshToken)
router.route('/logout').get(logout)
router.route('/info').get(auth, getUserInfo)

module.exports = router;