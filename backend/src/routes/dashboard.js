import express from 'express';
import { protect } from '../middleware/auth.js';
import { state } from '../data/store.js';

const router = express.Router();

router.get('/overview', protect, (req, res) => {
  res.json({
    totalDevices: state.devices.length,
    threatCount: state.antivirus.malware.length,
    vpnUsers: state.vpn.connectedUsers.length,
    complianceScore: 92,
    securityScore: 88,
    liveStats: {
      onlineDevices: state.devices.filter((device) => device.status === 'Online').length,
      offlineDevices: state.devices.filter((device) => device.status === 'Offline').length,
      alerts: state.alerts.filter((alert) => alert.status === 'Open').length,
    },
  });
});

router.get('/charts', protect, (req, res) => {
  res.json({
    line: [42, 56, 61, 68, 74, 82],
    doughnut: [65, 25, 10],
    alerts: state.alerts,
  });
});

export default router;
