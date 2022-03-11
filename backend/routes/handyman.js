const express = require('express')
const router = express.Router()

const {create, handymanById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch} = require('../controllers/handyman')
const {requireSignin, isAuth, isAdmin} = require('../controllers/auth')
const {userById} = require('../controllers/user')

router.get('/handyman/:handymanId', read)
router.post('/handyman/create/:userId', requireSignin, isAuth, isAdmin, create)
router.delete('/handyman/:handymanId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/handyman/:handymanId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/handymans', list)

router.get('/handymans/related/:handymanId', listRelated)
router.get('/handymans/categories', listCategories)
router.post('/handymans/by/search', listBySearch)
router.get('/handymans/search', listSearch)
router.get('/handyman/photo/:handymanId', photo)

router.param('userId', userById)
router.param('handymanId', handymanById)


module.exports = router; 