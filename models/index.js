const Takes = require('./Takes')
const Users = require('./takeUsers')


Users.hasMany(Takes);

Takes.belongsTo(Users, {
    foreignKey: 'user_id',
    onDelete: 'cascade'

})

  module.exports = {
      Takes,
      Users
  }