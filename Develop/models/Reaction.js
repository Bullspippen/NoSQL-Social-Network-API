// Reaction (SCHEMA ONLY)

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

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
