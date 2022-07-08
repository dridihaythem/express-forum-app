const express = require('express');
const AppError = require('./utils/AppError');
const errorMiddleware = require('./utils/errorMiddleware');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.all('*', (req, res, next) => {
	next(new AppError('endpoint not found', 404));
});

app.use(errorMiddleware);

module.exports = app;
