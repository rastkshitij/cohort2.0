import express from 'express';
import morgan from 'morgan';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // HTTP request logger
app.use(cors()); // Enable CORS for all routes

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Server' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});




export default app;
