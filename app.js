const express = require('express');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('cors');
const AppError = require('./utils/AppError');
const errorMiddleware = require('./utils/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const statisticRoutes = require('./routes/statisticRoutes');

const swaggerDocument = YAML.load('./swagger.yaml');
const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());
app.use(compression());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/statistics', statisticRoutes);

app.all('*', (req, res, next) => {
	next(new AppError('endpoint not found', 404));
});

app.use(errorMiddleware);

module.exports = app;
