const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FRONTEND_URL = 'https://dsa-task-manager-frontend-a7kedbn5o-trishas-projects-5eaae829.vercel.app';
const dotenv = require('dotenv'); 
app.use(cors({
    origin: FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
dotenv.config();
connectDB();
mongoose.connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected successfully!');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Task Manager API is running!');
});
app.use('/api/tasks', taskRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
