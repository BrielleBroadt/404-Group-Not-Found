const User = require('./User');
const Entries = require('./entries');
const SobrietyProgress = require('./sobrietyProgress')

User.hasMany(Entries, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = { User, Entries, SobrietyProgress };

