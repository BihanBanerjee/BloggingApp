import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => console.log("Connected to MongoDB"))


const app = express();


// app.get('/', (req, res) => {
//     res.json({msg:'API is working'});
// });

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => { // This is a global catch.
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
app.listen(3000, () => {
    console.log('Server running on port 3000!!!');
});