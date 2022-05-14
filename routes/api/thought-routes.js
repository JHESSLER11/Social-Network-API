const router = require('express').Router()

const { get } = require('express/lib/response')
const {
    getAllThoughts,
    createThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
router
    .route('/:id')
    .put(updateThought)
    .delete(removeThought)

module.exports = router;