const TransactionModel = require('../models/Transactions');
const BookModel = require('../models/Books');

exports.issueBook = (req, res) => {
    const { userId, bookId, dueDate } = req.body;
    const newTransaction = new TransactionModel({ user: userId, book: bookId, dueDate, transactionType: 'borrowed' });

    newTransaction.save()
        .then(transaction => {
            return BookModel.findByIdAndUpdate(bookId, { status: 'borrowed' })
                .then(() => res.status(201).json(transaction));
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.returnBook = (req, res) => {
    const { transactionId, bookId } = req.body;

    TransactionModel.findByIdAndUpdate(transactionId, { transactionType: 'returned' })
        .then(() => {
            return BookModel.findByIdAndUpdate(bookId, { status: 'available' })
                .then(() => res.status(204).end());
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.getUserTransactions = (req, res) => {
    const userId = req.user._id;
    TransactionModel.find({ user: userId })
        .populate('book')
        .populate('user')
        .then(transactions => res.status(200).json(transactions))
        .catch(err => res.status(500).json({ error: err.message }));
};
