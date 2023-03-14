const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
        // username must be a string, unique, and required
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        // email must be a string, unique, and required
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match a valid email address!']
        },
        // thoughts must be an array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // friends must be an array of _id values referencing the User model (self-reference)
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
        // prevents virtuals from creating duplicate of _id as `id`    
        },
        id: false
    }
)
// create a virtual called friendCount that retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
const User = model('User', userSchema);
module.exports = User;