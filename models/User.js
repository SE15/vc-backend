const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');
const bcrypt = require("bcrypt");

class User extends Model{}
User.init({
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

function addUser(fullname,username,password,profile_pic){
    const newUser= await User.create({
        name: `${fullname}`,
        username: `${username}`,
        password: `${password}`,
        profile_pic: `${profile_pic}`

    });
}

function getAllUsers(){
    User.findAll({
        attributes:['name','username','profile_pic']
    });
}

function searchUser(username){

    Post.findAll({
        where:{
            username: `${username}`
        }
    });

}

function deleteAccount(username){
    await User.destroy({
        where:{
            username: `${username}`
        }
    });
}

function changePassword(username,password){
    
    pass= bcrypt.hash(password, bcrypt.genSaltSync(8));
    
    await User.update({password: `${password}`},{
        where:{
            username: 'username'
        }
    })
}

function edit(username,name="",profile_pic=""){
    if (name.length>0 && profile_pic.length>0){
        await User.update({ name: `${name}` , profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(name.length>0){
        await User.update({ name: `${name}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(profile_pic.length>0){
        await User.update({profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }
}
