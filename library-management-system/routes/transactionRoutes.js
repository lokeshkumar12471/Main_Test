const express = require('express');
const transactionController = require('../controllers/transactionController');
const verifyUser = require('../middleware/verifyUser');

const router = express.Router();

router.get('/transactions', verifyUser, transactionController.getUserTransactions);

router.get('/transactions/user/me', verifyUser, transactionController.getUserTransactions);

router.post('/transactions/issue', verifyUser, transactionController.issueBook);

router.post('/transactions/return', verifyUser, transactionController.returnBook);

module.exports = router;
