const { Schema, model } = require('mongoose');

const userSchema = new Schema(

    {
        userName: {
            type: String,
            unique: true,
            require: 'User name is required',
            trim: true
        },

        email: {
            type: String,
            unique: true,
            require: 'email is required',
            trim: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'though'
            }
        ],
        friends: [userSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', userSchema);

model.exports = User;