const { sequelize } = require('./db'); 
require('../models/associations'); // Ensures associations are set up

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // ⚠️ Will drop and recreate tables (use once)
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  } finally {
    process.exit(); // Exit process after sync
  }
};

syncDB();
