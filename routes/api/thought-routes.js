const router = require('express').Router()

const { get } = require('express/lib/response')
const {
    getAllThoughts,
    createThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

module.exports = router;