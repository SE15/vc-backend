const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
const bcrypt = require("bcrypt");


const UserModel=sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: DataTypes.STRING,
    profile_pic: DataTypes.STRING
},{
    sequelize,
    modelName: 'User',
    tableName:'user',
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});

await User.sync({ force: true });
console.log("The table for the User model was just (re)created!");


module.exports=UserModel;