import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import cors from "cors";
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);   
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use("/api/chats" , chatRouter)
// Basic health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Perplexity Backend Server - DB Connected',
    port 
  });
});

export default app;

