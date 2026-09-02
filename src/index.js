require('dotenv').config();

const express = require('express');
const cors = require('cors');
const prisma = require('./config/prisma');

const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Streaming API is running',
        data: null,
        status: 'success'
    });
});

app.use('/api', routes);

// error-handling middleware, HARUS paling akhir setelah semua route
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.statusCode ? err.message : 'Internal server error';
    return res.status(statusCode).json({
        message: message,
        data: null,
        status: 'error'
    });
});

prisma.$connect()
    .then(() => {
        console.log('Database connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    });
