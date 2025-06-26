import { Router, Request, Response } from 'express';

const router: Router = Router();

// Type for individual setting
interface Setting {
  id: number;
  key: string;
  value: string;
}

// Hardcoded list
let settings: Setting[] = [
  { id: 1, key: 'theme', value: 'dark' },
  { id: 2, key: 'language', value: 'en' }
];

// GET /api/settings
router.get('/', (req: Request, res: Response): void => {
  res.json({ settings });
});

// POST /api/settings
router.post('/', (req: Request<{}, {}, Setting>, res: Response): void => {
  const newSetting = { ...req.body, id: Date.now() };
  settings.push(newSetting);
  res.status(201).json({ message: 'Setting created', setting: newSetting });
});

// PUT /api/settings/:id
router.put('/:id', (req: Request<{ id: string }, {}, Setting>, res: Response): void => {
  const id = parseInt(req.params.id);
  const index = settings.findIndex(s => s.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Setting not found' });
    return;
  }

  settings[index] = { ...settings[index], ...req.body };
  res.json({ message: 'Setting updated', setting: settings[index] });
});

export default router;
