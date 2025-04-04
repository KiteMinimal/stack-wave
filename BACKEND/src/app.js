const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/user.routes');

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router)

module.exports = app;
