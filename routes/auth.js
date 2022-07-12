const { Router } = require('express');

const { getLogin } = require('../controllers/auth');

const router = Router();

router.get('/login', getLogin);

module.exports = router;
