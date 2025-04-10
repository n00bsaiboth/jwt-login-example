const express = require('express');
const { login, dashboard } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/login', login);

router.get('/dashboard', authMiddleware, dashboard);

module.exports = router;
