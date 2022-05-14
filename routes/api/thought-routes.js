const router = require('express').Router()

const { get } = require('express/lib/response')
const {
    getAllThoughts,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller')
const { addFriend } = require('../../controllers/user-controller')

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
router
    .route('/:id')
    .put(updateThought)
    .delete(removeThought)
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;