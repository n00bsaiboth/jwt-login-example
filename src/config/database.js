const mongoose = require('mongoose');
const config = require('./config');

const connectDb = async () => {
    try {
        await mongoose.connect(config.url);
        console.log('MongoDB connection established. ');
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { connectDb }