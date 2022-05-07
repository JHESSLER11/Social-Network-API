const { Thought, User } = require('../models');
const { create } = require('../models/user');


const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate ({
            path: 'thought',
            select: '__v'
        })
        .select('__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}


module.exports = userController;