const express = require('express');
const router = express.Router();
const { loginUser, registerUser, logoutUser, getUserDetails } = require('../controllers/userController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/userdetails', getUserDetails);


module.exports = router;
