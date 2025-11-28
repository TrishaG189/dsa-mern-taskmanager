const express = require('express');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
dotenv.config();
connectDB();
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