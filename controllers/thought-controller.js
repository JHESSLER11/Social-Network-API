const { Thought, User } = require('../models');
//const { deleteUser } = require('./user-controller');

const thoughtController  = {

    getAllThoughts(req, res) {
        Thought.find({})
        //.populate({path: 'users', select: '-__v'})
        //.populate({path: 'friends', select: '-__v'})
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

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .populate( { path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
        .then(deleteThought => {
            if (!deleteThought) {
                return res.status(404).json( { message: 'No thought with this id' });
            }
            res.json(deleteThought);
        })
        .catch(err => res.json(err));
    },

    addReaction( { params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    }
}


module.exports = thoughtController;