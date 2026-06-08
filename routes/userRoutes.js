const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/search').get(userController.searchUsers);

module.exports = router;