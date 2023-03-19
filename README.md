# Social Network API

This is a backend application for a social network that allows users to share their thoughts, react to friends' thoughts, and create a friend list. It is built using Node.js, Express.js for routing, and MongoDB database with Mongoose ODM.

## Table of Contents
- [Models](#models)
  - [User](#user)
  - [Thought](#thought)
  - [Reaction](#reaction)
- [Controllers](#controllers)
  - [User Controller](#user-controller)
  - [Thought Controller](#thought-controller)
  - [Reaction Controller](#reaction-controller)
- [Routes](#routes)
  - [/api/users](#apiusers)
  - [/api/users/:userId/friends/:friendId](#apiusersuseridfriendsfriendid)
  - [/api/thoughts](#apithoughts)
  - [/api/thoughts/:thoughtId/reactions](#apithoughtsthoughtidreactions)

## Models

### User
- `username`: String, required, unique, and trimmed
- `email`: String, required, unique, and validated to match a valid email address
- `thoughts`: Array of _id values referencing the Thought model
- `friends`: Array of _id values referencing the User model (self-reference)

The User model has a virtual called `friendCount` that retrieves the length of the user's friends array field on query.

### Thought
- `thoughtText`: String, required, and must be between 1 and 280 characters
- `createdAt`: Date, set to the current timestamp by default
- `username`: String, required
- `reactions`: Array of nested documents created with the Reaction schema

The Thought model has a virtual called `reactionCount` that retrieves the length of the thought's reactions array field on query.

### Reaction
- `reactionId`: Mongoose ObjectId data type, set to a new ObjectId by default
- `reactionBody`: String, required, and 280 character maximum
- `username`: String, required
- `createdAt`: Date, set to the current timestamp by default

The Reaction schema is used as the reaction field's subdocument schema in the Thought model.

## Controllers

### User Controller
The User controller handles requests related to the User model. It has four methods:

- `getAllUsers`: GET request that retrieves all users
- `getUserById`: GET request that retrieves a single user by its _id and populates thought and friend data
- `createUser`: POST request that creates a new user
- `updateUser`: PUT request that updates a user by its _id

The `deleteUser` function removes a user by its _id and also removes the associated thoughts for that user.

### Thought Controller
The Thought controller handles requests related to the Thought model. It has four methods:

- `getAllThoughts`: GET request that retrieves all thoughts
- `getThoughtById`: GET request that retrieves a single thought by its _id
- `createThought`: POST request that creates a new thought and pushes the created thought's _id to the associated user's thoughts array field
- `updateThought`: PUT request that updates a thought by its _id
- `deleteThought`: DELETE request that removes a thought by its _id and also removes the thought's associated reactions

### Reaction Controller
The Reaction controller handles requests related to the Reaction model. It has two methods:

- `addReaction`: POST request that creates a new reaction and stores it in a single thought's reactions array field
- `deleteReaction`: DELETE request that removes a reaction

## Routes

### /api/users

The `/api/users` route handles requests related to the User model. It has four endpoints:

- GET: Retrieves an array of all users
- POST: Creates a new user
- GET /:id: Retrieves a single user by its _id and populates its thoughts and friends fields
- PUT /:id: Updates a user by its _id

### /api/users/:userId/friends/:friendId

The `/api/users/:userId/friends/:friendId` route handles requests related to adding and removing friends for a user. It has two endpoints:

- POST: Adds a user's friend
- DELETE: Removes a user's friend

### /api/thoughts

The `/api/thoughts` route handles requests related to the Thought model. It has two endpoints:

- GET: Retrieves an array of all thoughts
- POST: Creates a new thought and pushes its _id to the associated user's thoughts field

### /api/thoughts/:thoughtId/reactions

The `/api/thoughts/:thoughtId/reactions` route handles requests related to the Reaction model. It has two endpoints:

- POST: Creates a new reaction and adds it to the associated thought's reactions field
- DELETE: Removes a reaction by its _id from the associated thought's reactions field

Check out this Link to View the Functionality of the Application Using Insomnia: [SOCIAl NETWORK API](https://drive.google.com/file/d/1BL5MCdpSIn55YiqWFjIDxvseiLmNR0Bt/view)
