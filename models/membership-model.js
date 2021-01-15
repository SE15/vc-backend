const { Sequelize, DataTypes,Deferrable } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
const UserModel = require('./user-model');
const EventModel = require('./event-model');
const RoleModel = require('./role-model');

const MembershipModel=sequelize.define('Membership',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        unique:true,
        primaryKey:true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    event_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:EventModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    role_id:{
        type: DataTypes.DATE,
        references:{
            model:RoleModel,
            key:'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }} ,
    designation: DataTypes.STRING
},{
    sequelize,
    modelName: 'Membership',
    tableName:'membership',
    
});



module.exports=MembershipModel;