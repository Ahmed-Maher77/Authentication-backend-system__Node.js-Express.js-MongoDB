const User = require("../models/User");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").lean();
        if (!users.length) {
            return res.status(400).json({ message: "No users found" })
        };
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers };
