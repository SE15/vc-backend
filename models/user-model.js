const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require("bcrypt");

const UserModel=sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    is_deleted: DataTypes.BOOLEAN
},{
    sequelize,
    modelName:'User',
    tableName:'User',
    timestamps: false,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

module.exports = UserModel;