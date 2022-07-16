const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
const db = process.env.DATABASE;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then((con) => console.log('DB connected'))
	.catch(() => {
		console.log("Can't connect to db");
		process.exit(1);
	});

app.listen(port, () => console.log(`Server is running on port ${port}`));
