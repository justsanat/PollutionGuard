// test-db.js
const db = require('./db');
db.query('SELECT 1')
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection error:', err));