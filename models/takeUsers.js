const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Users extends Model { }

Users.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
            
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                isEmail: true,
				
            }
		},
        password: {
			type: DataTypes.STRING,
			allowNull: false,
            validate: {
                len: [6, 222]
            }
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'usertakes',
	}
);

module.exports = Users;
