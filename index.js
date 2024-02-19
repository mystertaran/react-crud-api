const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const config = require('./config');

const app = express();

mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error.message);
    });

app.use(express.json());
app.use('/api', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});