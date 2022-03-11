const formidable = require('formidable')
const _ = require('lodash')
const Handyman = require('../models/handyman')
const fs = require('fs')
const {errorHandler} = require('../heplers/dbErrorHandler')
const { DESTRUCTION } = require('dns')
const { exec } = require('child_process')

exports.handymanById = (req, res, next, id) => {
    Handyman.findById(id).exec((err, handyman) => {
        if(err || !handyman) {
            return res.status(400).json({
                error: 'Мастер не найден'
            })
        }
        req.handyman = handyman
        next()
    })
}

exports.read = (req, res) => {
    req.handyman.photo = undefined
    return res.json(req.handyman)
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Изображение не может быть загружено'
            })
        }        

        let handyman = new Handyman(fields)

        if(files.photo) {
            if(files.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'Размер изображения не должен превышать 3 МБ'
                }) 
            }
            handyman.photo.data = fs.readFileSync(files.photo.path)
            handyman.photo.сontentType = files.photo.type
        }

        const {name, description, category, information} = fields

        if(!name || !description || !category || !information) {
            return res.status(400).json({
                error: 'Все поля обязательны для заполнения'
            }) 
        }

        handyman.save((err, result) => { 
            if(err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result)
        })
    })
}

exports.remove = (req, res) => {
    let handyman = req.handyman
    handyman.remove((err, deletedHandyman) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(error)
            }) 
        }
        res.json({
            "message": 'Мастер успешно удален'
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: 'Изображение не может быть загружено'
            })
        }        

        let handyman = req.handyman
        handyman = _.extend(handyman, fields)

        if(files.photo) {
            if(files.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'Размер изображения не должен превышать 3 МБ'
                }) 
            }
            handyman.photo.data = fs.readFileSync(files.photo.path)
            handyman.photo.сontentType = files.photo.type
        }

        const {name, description, category, information} = fields

        if(!name || !description || !category || !information) {
            return res.status(400).json({
                error: 'Все поля обязательны для заполнения'
            }) 
        }

        handyman.save((err, result) => { 
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result)
        })
    })
}

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Handyman.find()
        .select('-photo')
        .populate('category')  
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, handymans) => {
            if (err) {
                return res.status(400).json({
                    error: 'Мастера не найдены'
                })
            }
            res.json(handymans)
        })
}

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Handyman.find({_id: {$ne: req.handyman}, category: req.handyman.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, handymans) => {
            if (err) {
                return res.status(400).json({
                    error: 'Мастера не найдены'
                })
            }
            res.json(handymans) 
        })
}

exports.listCategories = (req, res) => {
    Handyman.distinct("Category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Категории не найдены'
            })
        }
        res.json(categories)
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'asc'
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    let limit = req.body.limit ? parseInt(req.body.limit) : 100
    let skip = parseInt(req.body.skip)
    let findArgs = {}

    for(let key in req.body.filters) {
        if(req.body.filters[key].length > 0) {
            if(key === "rating") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Handyman.find(findArgs)
        .select('-photo')
        .populate('category')  
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Мастера не найдены'
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
}

exports.photo = (req, res) => {
    if(req.handyman.photo.data) {
        res.set('Content-Type', req.handyman.photo.contentType)
        return res.send(req.handyman.photo.data)
    }
    next()
}

exports.listSearch = (req, res) => {
    const query = {}

    if(req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        if(req.query.category && req.query.category != 'All') {
            query.category = req.query.category
        }
    }

    Handyman.find(query, (err, handymans) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(handymans)
    }).select('-photo')
}

