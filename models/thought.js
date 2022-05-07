const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      userName: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        //get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const thoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now, 
            //get: grab utils from pizza
        },

        userName: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

thoughtSchema.virtual('reaction').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;