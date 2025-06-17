import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFound, setupErrorHandlers } from './middleware/errorHandler';
import { initializeDatabase } from './config/database';
import { httpLogger, logger } from './config/logger';
import { generalLimiter } from './config/rateLimiter';
import { setupSwagger } from './config/swagger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Setup error handlers
setupErrorHandlers();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Rate limiting
app.use(generalLimiter);

// CORS configuration
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP logging middleware
app.use(httpLogger);

// Setup Swagger documentation
setupSwagger(app);

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Chefito Backend API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    documentation: '/api/docs',
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Initialize database connection
    const dbConnected = await initializeDatabase();
    
    if (!dbConnected) {
      logger.warn('Database connection could not be established. Some features may not work.');
    }

    app.listen(PORT, () => {
      logger.info('🚀 Chefito Backend API started', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        frontendUrl: FRONTEND_URL,
        documentation: `http://localhost:${PORT}/api/docs`,
        healthCheck: `http://localhost:${PORT}/api/health`,
        databaseConnected: dbConnected,
      });
      
      if (!dbConnected) {
        logger.warn('⚠️  Please set up your Supabase database tables');
      }
    });
  } catch (error) {
    logger.fatal('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

export default app;