import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import settingsRoutes from './routes/settings';
import userRoutes from './routes/users';
import { authMiddleware } from './middleware/auth';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/settings', authMiddleware, settingsRoutes);
app.use('/api/users', authMiddleware, userRoutes);

app.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});
