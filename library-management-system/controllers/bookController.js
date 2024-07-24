const BookModel = require('../models/Books');

exports.getBooks = (req, res) => {
    BookModel.find()
        .then(books => res.json(books))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.addBook = (req, res) => {
    const { name, author } = req.body;
    BookModel.create({ name, author, status: 'available' })
        .then(book => res.status(201).json(book))
        .catch(err => res.status(500).json({ error: err.message }));
};

exports.deleteBook = (req, res) => {
    const { id } = req.params;
    BookModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'Book deleted' }))
        .catch(err => res.status(500).json({ error: err.message }));
};
