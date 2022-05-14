const { Thought, User } = require('../models');
const { deleteUser } = require('./user-controller');

const thoughtController  = {

    getAllThoughts(req, res) {
        Thought.find({})
        // .populate({path: 'users', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        })
    },

    createThought({ body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                { _id: body.id },
                { $push: { thoughts: dbThoughtData._id }}
            )
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(deleteThought => {
            if (!deleteThought) {
                return res.status(404).json( { message: 'No thought with this id' });
            }
            // return User.findOneAndUpdate(
            //     {_id: params.id },
            //     { $pull: { thoughts: params.id }},
            //     { new: true }
            // )
            res.json(deleteThought);
        })
        .catch(err => res.json(err));
    }
}


module.exports = thoughtController;