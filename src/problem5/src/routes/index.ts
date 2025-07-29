import { Router } from 'express';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';

const router = Router();

// Mount route modules
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
