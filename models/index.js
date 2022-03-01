const Takes = require('./Takes')
const Users = require('./takeUsers')
const Comments = require('./Comments')


Users.hasMany(Takes);

Takes.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

});

Takes.hasMany(Comments);

Comments.belongsTo(Takes);

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