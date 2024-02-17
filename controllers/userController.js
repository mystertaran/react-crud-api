const User = require('../models/Users');

const userController = {
    createUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.statuy(201).json(newUser);
            
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userController;