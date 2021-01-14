const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
class User extends Model{
    addUser(fullname,username,password,profile_pic){
    const newUser= await UserModel.create({
        name: `${fullname}`,
        username: `${username}`,
        password: `${password}`,
        profile_pic: `${profile_pic}`

    });
}

    getAllUsers(){
    const users=UserModel.findAll({
        attributes:['name','username','profile_pic']
    });
    return users;
}

    searchUser(username){

    const user=Post.findAll({
        where:{
            username: `${username}`
        }
    });
    return user;

}

    deleteAccount(username){
    await UserModel.destroy({
        where:{
            username: `${username}`
        }
    });
}

    changePassword(username,password){
    
    pass= bcrypt.hash(password, bcrypt.genSaltSync(8));
    
    await UserModel.update({password: `${password}`},{
        where:{
            username: 'username'
        }
    })
}

    edit(username,name="",profile_pic=""){
    if (name.length>0 && profile_pic.length>0){
        await UserModel.update({ name: `${name}` , profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(name.length>0){
        await UserModel.update({ name: `${name}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(profile_pic.length>0){
        await UserModel.update({profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }
}
}
