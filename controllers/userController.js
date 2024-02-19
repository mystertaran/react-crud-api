const User = require("../models/Users");

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
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
  },

  updateUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const userDataToUpdate = req.body;

      const existingUser = await User.findById(userID);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      existingUser.firstName = userDataToUpdate.firstName;
      existingUser.lastName = userDataToUpdate.lastName;
      existingUser.email = userDataToUpdate.email;
      existingUser.phoneNumber = userDataToUpdate.phoneNumber;

      const updatedUser = await existingUser.save();

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

    deleteUser: async (req, res) => {
        try {
        const userID = req.params.id;
        const existingUser = await User.findById(userID);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.deleteOne({ _id: userID });

        res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
}
};

module.exports = userController;
