const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { connectDb } = require('./config/database');

const app = express();

connectDb();

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

app.get('/', (req, res) => {
    res.send("welcome to authentication application. ");
});

app.use(express.static('build'));

module.exports = app;
