const User = require('./User');
const Job = require('./Job');
const Application = require('./Application');

User.hasMany(Job, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Job.belongsTo(User, {
  foreignKey: 'user_id',
});

Job.hasMany(Application, {
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
});

Application.belongsTo(Job, {
  foreignKey: 'job_id',
});

module.exports = { User, Job, Application };
