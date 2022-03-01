const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Comments extends Model { }

Comments.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'usertakes',
				key: 'id',
			}
			
		},
		comment_username: {
			type: DataTypes.STRING,
			allowNull: false,
			// references: {
			// 	model: 'usertakes',
			// 	key: 'username',
			// }
			
		},
		to_whom: {
			type: DataTypes.STRING,
			allowNull: false,
            
			
		},
		to_what: {
			type: DataTypes.INTEGER,
			allowNull: false,
            references: {
				model: 'takes',
				key: 'id',
			}
			
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'comments',
	}
);

module.exports = Comments;
