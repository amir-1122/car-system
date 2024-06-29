const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DB_URI, PORT } = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const carRoutes = require('./routes/car');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cars', carRoutes);

mongoose.connect(DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
