const express = require('express');
const { sellSportTicket } = require ('../controller/sportController');
const { expiredTicket } = require('../controller/expireController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

    router.post('/sport', authenticateUser, sellSportTicket);
    router.post('/expiredticket',expiredTicket)

module.exports = router;