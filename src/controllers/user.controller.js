const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({message: "Please check you username or password. "});
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password. " });
        }

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password. " });
        }

        const credentials = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(credentials, process.env.SECRET, {expiresIn: "1h"});

        return res.status(200).json({ message: "Login succesful. ", data: user, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json( { message: "error during login. "} );
    }
};

const dashboard = (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the dashboard!',
        user: req.user
    });
};

module.exports = { login, dashboard };