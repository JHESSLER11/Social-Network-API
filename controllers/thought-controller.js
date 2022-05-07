const { Thought, User } = require('../models')

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
}


module.exports = thoughtController;