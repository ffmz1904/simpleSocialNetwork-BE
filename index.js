require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();

