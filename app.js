const express = require('express');
const errorMiddleware = require('./utils/errorMiddleware');

const app = express();

app.use(express.json());

app.use(errorMiddleware);

module.exports = app;
