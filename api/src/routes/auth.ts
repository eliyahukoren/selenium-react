import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router: Router = Router();

interface LoginRequestBody {
  username: string;
  password: string;
}

const mockUser = {
  id: 1,
  username: 'admin',
  password: '1234'
};

router.post('/login', (req: Request<{}, {}, LoginRequestBody>, res: Response): void => {
  const { username, password } = req.body;

  if (username !== mockUser.username || password !== mockUser.password) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { userId: mockUser.id, username: mockUser.username },
    'secret123', // use .env later
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// @ts-ignore
router.post('/register', (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  return res.status(201).json({ message: 'User registered successfully' });
});

export default router;
