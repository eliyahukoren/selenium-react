import { Router, Request, Response } from 'express';

const router: Router = Router();

interface NewUser {
  username: string;
  password: string;
}

// Just a simple in-memory array (not persistent)
const users: NewUser[] = [
  { username: 'admin', password: '1234' }
];

// POST /api/users – create new user
router.post('/', (req: Request<{}, {}, NewUser>, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password required' });
    return;
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    res.status(409).json({ error: 'User already exists' });
    return;
  }

  users.push({ username, password });
  res.status(201).json({ message: 'User created' });
});

export default router;
