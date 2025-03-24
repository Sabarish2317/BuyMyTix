const express = require('express');
const { sellConcertTicket } = require ('../controller/concertController');
const { expiredTicket } = require('../controller/expireController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

    router.post('/concert', authenticateUser, sellConcertTicket);
    router.post('/expiredticket',expiredTicket)

module.exports = router;