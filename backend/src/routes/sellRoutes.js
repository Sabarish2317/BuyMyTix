const express = require('express');
const { sellTicket } = require ('../controller/sellController');
const { expiredTicket } = require('../controller/expireController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

    router.post('/sellticket', authenticateUser, sellTicket);
    router.post('/expiredticket',expiredTicket)

module.exports = router;