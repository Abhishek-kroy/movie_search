const express = require('express');
const router = express.Router();
const AIML_API = require('../controllers/AIML_API');

router.get('/aimlsuggesstion', AIML_API);

module.exports = router;