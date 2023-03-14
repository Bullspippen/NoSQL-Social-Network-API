const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find()
    // populate thoughts and friends
     
      // exclude __v and __v is a property that Mongoose uses to define the schema version
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);

      });
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
    // populate thoughts and friends
      .populate ("thoughts")
      .populate("friends")
   
      .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT to update a user by its _id
  updateUser(req, res) {
    // findOneAndUpdate() is a Mongoose method that finds a single document we want to update, updates it, and returns the updated document
    User.findOneAndUpdate({ _id: req.params.userId }, {$set: req.body}, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
          
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // DELETE to remove a user by its _id
  deleteUser(req, res) {
    // findOneAndDelete() is a Mongoose method that finds a single document we want to delete, deletes it, and returns the deleted document
    User.findOneAndDelete({ _id: req.params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });

        }
        // Remove associated thoughts from the deleted user
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and associated thoughts deleted!' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST to add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )

      .then(dbUserData => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user found with this id!' });
         
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // DELETE to remove a friend from a user's friend list
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
    
          .then(dbUserData => {
            if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
             
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};

module.exports = userController;