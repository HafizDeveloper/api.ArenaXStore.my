const { syncDatabase } = require('./models');
const { testConnection } = require('./config/database');

const runSync = async () => {
  await testConnection(); // Test connection first
  await syncDatabase();   // Then sync models
  process.exit(0);       // Exit the process after sync
};

runSync();
