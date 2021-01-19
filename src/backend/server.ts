import express from 'express';
import { runApi } from './api';
import { initializeDb } from './database';

const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');

// Load variables from .env file into process.env
require('dotenv').config();

const run = async () => {
    const expressApp = express();

    expressApp.use(cors());

    // Connect to DB.
    const sequelize = await initializeDb();

    // Setup API.
    await runApi(expressApp, sequelize);

    expressApp.use(history());
    expressApp.use(express.static(path.resolve(__dirname, '../../public')));

    const port = process.env.PORT;
    expressApp.listen(port, () => {
        console.log(`Server is listening at localhost:${port}`);
    });
};

run();
