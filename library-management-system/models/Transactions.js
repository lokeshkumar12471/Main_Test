const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    dueDate: { type: Date, required: true },
    transactionType: { type: String, enum: ['borrowed', 'returned'], required: true }
}, { timestamps: true });

const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = TransactionModel;
