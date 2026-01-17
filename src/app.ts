import express from 'express';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
