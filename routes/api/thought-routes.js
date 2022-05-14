const router = require('express').Router()

const { get } = require('express/lib/response')
const {
    getAllThoughts,
    createThought,
    removeThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
router
    .route('/:id')
    .delete(removeThought)

module.exports = router;