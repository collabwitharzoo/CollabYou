const router = require('express').Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');

// Get all applications (with optional status filter)
router.get('/', auth, async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const apps = await Application.find(filter).sort({ createdAt: -1 });
  res.json(apps);
});

// Get single application
router.get('/:id', auth, async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ message: 'Not found' });
  res.json(app);
});

// Update status / notes
router.patch('/:id', auth, async (req, res) => {
  const { status, notes } = req.body;
  const app = await Application.findByIdAndUpdate(
    req.params.id,
    { ...(status && { status }), ...(notes !== undefined && { notes }) },
    { new: true }
  );
  if (!app) return res.status(404).json({ message: 'Not found' });
  res.json(app);
});

// Delete application
router.delete('/:id', auth, async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
