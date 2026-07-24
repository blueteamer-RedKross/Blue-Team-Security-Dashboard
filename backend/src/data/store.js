import bcrypt from 'bcryptjs';

const initialState = {
  users: [
    {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      phone: '+1 555 0100',
      location: 'New York, USA',
      password: bcrypt.hashSync('admin123', 10),
    },
  ],
  devices: [
    { id: 'dev-1', name: 'Windows-01', type: 'Laptop', owner: 'Alice', location: 'HQ', status: 'Online', lastSeen: '2 mins ago' },
    { id: 'dev-2', name: 'Server-01', type: 'Server', owner: 'Bob', location: 'DC', status: 'Offline', lastSeen: '1 hr ago' },
    { id: 'dev-3', name: 'MacBook-02', type: 'Laptop', owner: 'Nina', location: 'Remote', status: 'Online', lastSeen: '10 mins ago' },
  ],
  antivirus: {
    scanHistory: [
      { id: 1, type: 'Quick Scan', status: 'Completed', time: '09:20', threats: 2 },
      { id: 2, type: 'Full Scan', status: 'Completed', time: '18:40', threats: 0 },
    ],
    malware: [
      { id: 1, name: 'Trojan.Generic', severity: 'High', endpoint: 'Windows-01' },
      { id: 2, name: 'PUP.Optional', severity: 'Medium', endpoint: 'MacBook-02' },
    ],
    lastScan: '09:20',
  },
  edr: {
    endpoints: [
      { id: 'edr-1', name: 'Windows-01', status: 'Protected', risk: 'Medium', lastActivity: '2 mins ago' },
      { id: 'edr-2', name: 'Server-01', status: 'Isolated', risk: 'High', lastActivity: '1 hr ago' },
    ],
    timeline: [
      { id: 1, title: 'Suspicious process executed', time: '08:15', severity: 'High' },
      { id: 2, title: 'Isolation applied', time: '08:50', severity: 'Medium' },
    ],
  },
  ueba: {
    riskScores: [
      { id: 1, user: 'Alice', score: 82, trend: 'Up' },
      { id: 2, user: 'Bob', score: 61, trend: 'Flat' },
    ],
    activity: [
      { id: 1, user: 'Alice', action: 'Login', time: '08:30' },
      { id: 2, user: 'Bob', action: 'Download', time: '09:10' },
    ],
    loginHistory: [
      { id: 1, user: 'Alice', ip: '10.1.2.3', country: 'USA', time: '08:30' },
      { id: 2, user: 'Bob', ip: '10.1.2.9', country: 'UK', time: '09:10' },
    ],
    suspiciousUsers: [
      { id: 1, user: 'Bob', reason: 'Repeated after-hours access' },
    ],
  },
  vpn: {
    connectedUsers: [
      { id: 1, name: 'Alice', ip: '198.51.100.3', country: 'USA', status: 'Connected', lastActivity: 'Now', session: 'Active' },
      { id: 2, name: 'Nina', ip: '203.0.113.25', country: 'DE', status: 'Disconnecting', lastActivity: '5 mins ago', session: 'Idle' },
    ],
    sessionLogs: [
      { id: 1, user: 'Alice', action: 'Connected', time: '08:35' },
      { id: 2, user: 'Nina', action: 'Disconnected', time: '09:00' },
    ],
  },
  mdm: {
    devices: [
      { id: 'mdm-1', name: 'iPhone-01', owner: 'Alice', compliance: 'Compliant', status: 'Active' },
      { id: 'mdm-2', name: 'Android-07', owner: 'Nina', compliance: 'At Risk', status: 'Locked' },
    ],
    compliance: [
      { id: 1, label: 'Encryption', value: 95 },
      { id: 2, label: 'OS Patch', value: 88 },
    ],
  },
  regshot: {
    snapshots: [
      { id: 1, name: 'Baseline', createdAt: '2026-07-20' },
      { id: 2, name: 'Post Patch', createdAt: '2026-07-21' },
    ],
    differences: [
      { id: 1, path: 'C:/Windows/System32/drivers/etc/hosts', change: 'Modified' },
    ],
  },
  alerts: [
    { id: 1, title: 'Suspicious login', severity: 'High', status: 'Open', source: 'UEBA' },
    { id: 2, title: 'Malware signature found', severity: 'Medium', status: 'Open', source: 'Antivirus' },
    { id: 3, title: 'VPN disconnect anomaly', severity: 'Low', status: 'Resolved', source: 'VPN' },
  ],
  reports: {
    daily: [{ id: 1, label: 'Alerts', value: 14 }],
    weekly: [{ id: 1, label: 'Scans', value: 38 }],
    monthly: [{ id: 1, label: 'Compliance', value: 92 }],
  },
  settings: {
    profile: { name: 'Admin User', email: 'admin@example.com', phone: '+1 555 0100', notifications: true, theme: 'dark' },
    password: {},
  },
};

export const state = structuredClone(initialState);

export const resetStore = () => {
  Object.assign(state, structuredClone(initialState));
};
