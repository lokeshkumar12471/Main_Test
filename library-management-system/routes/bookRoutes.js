const express = require('express');
const router = express.Router();
const verifyUser = require('../middleware/verifyUser');
const { addBook, deleteBook, getBooks } = require('../controllers/bookController');

router.get('/books', verifyUser, getBooks);
router.post('/books', verifyUser, addBook);
router.delete('/books/:id', verifyUser, deleteBook);

module.exports = router;
