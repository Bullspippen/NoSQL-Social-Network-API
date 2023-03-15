const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const thoughtSchema = new Schema(
    {
        // thoughtText must be a string, required, and between 1 and 280 characters
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
    },
        // createdAt must be a date, default value is the current timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
    },
        // username must be a string, required
        username: {
            type: String,
            required: true
    },
        reactions: [reactionSchema]
    },
    {
        // use getters to format the createdAt timestamp on query
        toJSON: {
            getters: true,
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
)
// create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;
