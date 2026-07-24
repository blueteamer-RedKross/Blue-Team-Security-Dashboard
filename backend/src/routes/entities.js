import express from 'express';
import { protect } from '../middleware/auth.js';
import { state } from '../data/store.js';

const router = express.Router();

router.get('/devices', protect, (req, res) => res.json(state.devices));
router.post('/devices', protect, (req, res) => {
  const device = { id: `dev-${Date.now()}`, ...req.body };
  state.devices.push(device);
  res.status(201).json(device);
});
router.put('/devices/:id', protect, (req, res) => {
  const index = state.devices.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Device not found' });
  state.devices[index] = { ...state.devices[index], ...req.body };
  res.json(state.devices[index]);
});
router.delete('/devices/:id', protect, (req, res) => {
  state.devices = state.devices.filter((item) => item.id !== req.params.id);
  res.json({ message: 'Device deleted' });
});

router.get('/antivirus', protect, (req, res) => res.json(state.antivirus));
router.post('/antivirus/scan', protect, (req, res) => res.json({ message: 'Scan started', type: req.body.type || 'Quick' }));
router.post('/antivirus/quarantine', protect, (req, res) => res.json({ message: 'Threat quarantined' }));

router.get('/edr', protect, (req, res) => res.json(state.edr));
router.post('/edr/isolate', protect, (req, res) => res.json({ message: 'Device isolated' }));
router.post('/edr/restore', protect, (req, res) => res.json({ message: 'Device restored' }));

router.get('/ueba', protect, (req, res) => res.json(state.ueba));

router.get('/vpn', protect, (req, res) => res.json(state.vpn));
router.post('/vpn/connect', protect, (req, res) => res.json({ message: 'Connected' }));
router.post('/vpn/disconnect', protect, (req, res) => res.json({ message: 'Disconnected' }));

router.get('/mdm', protect, (req, res) => res.json(state.mdm));
router.post('/mdm/lock', protect, (req, res) => res.json({ message: 'Device locked' }));
router.post('/mdm/wipe', protect, (req, res) => res.json({ message: 'Wipe initiated' }));

router.get('/regshot', protect, (req, res) => res.json(state.regshot));
router.post('/regshot/snapshot', protect, (req, res) => res.json({ message: 'Snapshot created' }));
router.post('/regshot/compare', protect, (req, res) => res.json({ message: 'Comparison completed' }));

router.get('/alerts', protect, (req, res) => res.json(state.alerts));
router.put('/alerts/:id/resolve', protect, (req, res) => {
  const alert = state.alerts.find((item) => item.id === Number(req.params.id));
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  alert.status = 'Resolved';
  res.json(alert);
});
router.delete('/alerts/:id', protect, (req, res) => {
  state.alerts = state.alerts.filter((item) => item.id !== Number(req.params.id));
  res.json({ message: 'Alert deleted' });
});

router.get('/reports', protect, (req, res) => res.json(state.reports));
router.get('/users', protect, (req, res) => res.json(state.users));
router.post('/users', protect, (req, res) => {
  const user = { id: `user-${Date.now()}`, ...req.body, password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : undefined, status: req.body.status || 'Active' };
  state.users.push(user);
  res.status(201).json(user);
});
router.put('/users/:id', protect, (req, res) => {
  const index = state.users.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  state.users[index] = { ...state.users[index], ...req.body };
  res.json(state.users[index]);
});
router.delete('/users/:id', protect, (req, res) => {
  state.users = state.users.filter((item) => item.id !== req.params.id);
  res.json({ message: 'User deleted' });
});

router.get('/settings', protect, (req, res) => res.json(state.settings));
router.put('/settings', protect, (req, res) => {
  state.settings = { ...state.settings, ...req.body };
  res.json(state.settings);
});

export default router;
