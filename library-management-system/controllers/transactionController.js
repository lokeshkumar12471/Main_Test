const TransactionModel = require('../models/Transactions');
const BookModel = require('../models/Books');

exports.issueBook = (req, res) => {
    const { userId, bookId, dueDate } = req.body;

    BookModel.findById(bookId)
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            if (book.status === 'borrowed') {
                return res.status(400).json({ error: 'Book is already borrowed' });
            }

            const newTransaction = new TransactionModel({
                user: userId,
                book: bookId,
                dueDate,
                transactionType: 'borrowed'
            });

            return newTransaction.save()
                .then(transaction => {
                    return BookModel.findByIdAndUpdate(bookId, { status: 'borrowed' }, { new: true })
                        .then(() => res.status(201).json(transaction));
                });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.returnBook = (req, res) => {
    const { transactionId, bookId } = req.body;

    TransactionModel.findById(transactionId)
        .then(transaction => {
            if (!transaction) {
                return res.status(404).json({ error: 'Transaction not found' });
            }

            if (transaction.transactionType === 'returned') {
                return res.status(400).json({ error: 'Book already returned' });
            }

            return TransactionModel.findByIdAndUpdate(transactionId, { transactionType: 'returned' }, { new: true })
                .then(() => {
                    return BookModel.findByIdAndUpdate(bookId, { status: 'available' }, { new: true })
                        .then(() => res.status(204).end());
                });
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
