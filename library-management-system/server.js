const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/library-management');

app.use('/api', userRoutes);
app.use('/api', bookRoutes);
app.use('/api', transactionRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
