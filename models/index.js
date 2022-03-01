const Takes = require('./Takes')
const Users = require('./takeUsers')
const Comments = require('./Comments')
const sequelize = require('../config/connection')


Users.hasMany(Takes);

Takes.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

});


Takes.belongsToMany(Comments, {
    through: 'Take_Comments'
});

Comments.belongsTo(Takes, {
    through: 'Take_Comments'
});

Users.hasMany(Comments);

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

});



  module.exports = {
      Takes,
      Users,
      Comments
  }