const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const reactionSchema = new Schema(
    {
        // reactionId must be a default value of a new ObjectId
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // reactionBody must be a string, required, and between 1 and 280 characters
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        // username must be a string, required
        username: {
            type: String,
            required: true
        },
        // createdAt must be a date, default value is the current timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
    }
    },
    {
        // use getters to format the createdAt timestamp on query
        toJSON: {
            getters: true
    },
        // prevents virtuals from creating duplicate of _id as `id`
    id: false
    }
);
module.exports = reactionSchema;1
