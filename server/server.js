import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import sanitizeHtml from "sanitize-html";
import hpp from 'hpp';
import compression from 'compression';
import dotenv from 'dotenv';

// Import routes
import routes from './routes/index.js';

// Import middleware
import { generalLimiter, authLimiter } from './middleware/rateLimiting.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);

// ✅ BODY PARSING FIRST - so routes can read JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Data sanitization AFTER body parsing
app.use((req, res, next) => {
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== "object") return;

    for (let key in obj) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        sanitizeObject(obj[key]);
      }
    }
  };

  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  next();
});

// XSS Sanitizer
app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      }
    }
  }
  next();
});

// HPP Protection
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Compression
app.use(compression());

// MongoDB Connection
const connectDB = async () => {
  try {
    let connectionString;
    let options = {};
    
    if (process.env.NODE_ENV === 'production') {
      connectionString = process.env.MONGODB_ATLAS_URI;
      console.log('🔗 Connecting to MongoDB Atlas...');
      options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    } else {
      connectionString = process.env.MONGODB_URI;
      console.log('🔗 Connecting to local MongoDB...');
    }

    const conn = await mongoose.connect(connectionString, options);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

// ✅ ROUTES LAST - after all middleware
app.use('/api/v1', routes);
app.use('/api', routes); // Support both versions

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'SafariVista API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: `${process.uptime().toFixed(2)} seconds`
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 SafariVista backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

export default app;