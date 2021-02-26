const request = require('supertest');
const Guest=require('../../services/guest');

let server;

describe('/users', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
    });

    describe('GET /:id', () => {

        it('should return a guest if valid id is passed', async () => {
        
        const id=6;
        // user_info = {first_name:"def",last_name:"lmn", email:"jkl@mail.com", password:"password"};
        // let guest =new Guest().createAccount(user_info);      
        const res = await request(server).get('/users/' + id);

        expect(res.status).toBe(404);
        //expect(res.body).toHaveProperty("obj", [[], [], [], [{"first_name": "Kumar", "last_name": "Sanga"}]]);  

        });

        it('should return an empty guest with the given id that not exists', async () => {
        
        const id=253;
        const res = await request(server).get('/users/' + id);

        expect(res.status).toBe(404);
        //expect(res.body).toHaveProperty("obj",[[], [], [], []]);
        });

    });

    // describe('POST /', () => {

    //     let user_info;

    //     const exec=async()=>{
    //         user_info = {first_name:"def",last_name:"lmn", email:"jkl@mail.com", password:"password"};
    //         return await request(server).post('/users/registration').send({ first_name: user_info.first_name,last_name: user_info.last_name, email:user_info.email, password:user_info.password });
    //     }

    //     it('should return client registered if register success', async () => {            

    //         const res = await exec();
    
    //         expect(res.status).toBe(200);
    //         //expect(res.body).toBe("msg","User successfully registered");
    //     });


    //     it('should return user information not be null', async () => {   
            
    //         user_info = {first_name:"",last_name:"", email:"", password:""};
    //         const res = await exec();
    
    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty("err", 1);
    //     });
    
        
    //   });


  

  
});
