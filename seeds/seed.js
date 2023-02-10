const sequelize = require('../config/connection');
const { User, Job } = require('../models');

const userData = require('./userData.json');
// const projectData = require('./projectData.json');
const jobData = require('./jobData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    await User.create({
      ...user,
      individualHooks: true,
      returning: true,
    });
  }
  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const job of jobData) {
    await Job.create({
      ...job,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
