const express = require('express');
const { getMovieData } = require ('../controller/movieController');

const router = express.Router();

    router.post('/getmovie',getMovieData);

module.exports = router;