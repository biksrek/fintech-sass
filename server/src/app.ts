import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app: Application = express();

// Middleware
app.use(express.json());
// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://fintech-sass.vercel.app",
    process.env.CLIENT_URL || ""
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;
