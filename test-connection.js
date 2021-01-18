const Connection = require('./services/user/connection.js');

//Already added to user.js

async function addConnection(recipient_id) {
    //temp data
    
    this.requester_id = 11;
    reque_id=this.requester_id;
    let checkin=null;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        checkin = await Connection.checkValidations(recipient_id,reque_id);
        
    } catch (err) {
        console.log(err.message);
    }

    if(checkin===true){
    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        
        let connection = new Connection({requester_id: this.requester_id, recipient_id: recipient_id});
        return await connection.saveToDatabase(true);
        //return connection;
        
    } catch (err) {
        console.log(err.message);
    }
    }else{
        return "Already exists";
    }
}

async function removeConnection(recipient_id) {
    //temp data
    this.requester_id = 11;
    let reque_id=this.requester_id;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        let connection = await Connection.create(recipient_id,reque_id);
        return await connection.destroy();
    } catch (err) {
        console.log(err.message);
    }
}

async function respondConnection(recipient_id,accept){

    this.requester_id = 2;
    let reque_id=this.requester_id;
    let res = null;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        res = await Connection.updateState(recipient_id,reque_id,accept);
        return res;
        
    } catch (err) {
        console.log(err.message);
    }

}


//addConnection(2).then(result => console.log('Connection Added: ', result));
removeConnection(2).then(result => console.log('Connection Removed: ', result));
//respondConnection(6,false).then(result => console.log('Connection state updated: ', result));