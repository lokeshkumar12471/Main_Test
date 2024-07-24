const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, default: 'available' }
});

const BookModel = mongoose.model('books', BookSchema);
module.exports = BookModel;
