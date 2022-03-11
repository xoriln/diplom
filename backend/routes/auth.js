const express = require('express')
const router = express.Router()

const {signup, signin, signout, requireSignin} = require('../controllers/auth')

router.post("/signup", exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Укажите имя').isLength({min:1})
    req.check('email', 'Электронная почта должна быть от 3 до 32 символов')
        .matches(/.+\@.+\..+/)
        .withMessage('Электронная почта должна содержать @')
        .isLength({
            min: 3, max: 32
        })
    req.check('password', 'необходим пароль').isLength({min:1})
    req.check('password')
        .isLength({min: 6})
        .withMessage('Пароль должен содержать не менее 6 символов')
        .matches(/\d/)
        .withMessage('Пароль должен содержать число')
    const errors = req.validationErrors()
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError})
    }
    next()
}, signup)

router.post('/signin', signin)
router.get('/signout', signout)


module.exports = router   