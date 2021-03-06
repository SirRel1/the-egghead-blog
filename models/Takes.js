const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Takes extends Model { }

Takes.init(
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
		
		title: {
			type: DataTypes.STRING,
			allowNull: false,
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
		modelName: 'takes',
	}
);

module.exports = Takes;
