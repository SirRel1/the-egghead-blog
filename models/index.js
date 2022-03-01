const Takes = require('./Takes')
const Users = require('./takeUsers')
const Comments = require('./Comments')



Users.hasMany(Takes);

Takes.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

});


Takes.hasMany(Comments, {
    foreignKey: 'to_what',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Takes, {
    foreignKey: 'takes_id'
});

Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

});



  module.exports = {
      Takes,
      Users,
      Comments
  }