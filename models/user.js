const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            require: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        //prevents duplicate id's
        id: false
    }
);

// adds up number of friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;