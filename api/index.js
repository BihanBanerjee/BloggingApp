import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => console.log("Connected to MongoDB"))


const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000!!!');
});

// app.get('/test', (req, res) => {
//     res.json({msg:'API is working'});
// });

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => { // This is a global catch.
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});