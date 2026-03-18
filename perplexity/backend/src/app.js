import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
// Basic health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Perplexity Backend Server - DB Connected',
    port 
  });
});

export default app;

