const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: String, required: true },
    role: { type: String, default: 'user' }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
