const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./routes/route');
const cors = require('cors');

const PORT = process.env.PORT || 6000;

// Configure CORS to allow specific origins
const corsOptions = {
    origin: '*', // Replace with the client origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/v1',router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});