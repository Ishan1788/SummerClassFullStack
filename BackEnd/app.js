import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

const app= express();
dotenv.config();
//helps read json data


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); //prefix all routes
app.use('/api/user', userRoutes);
export default app;