// const request = require('supertest');

// let server;

// describe('/users', () => {

//     beforeEach(() => { 
//         server = require('../../index'); 
//     });
//     afterEach(async () => { 
//         server.close();
//     });
    
//     describe('GET /', () => {

        
//         let key;

//         const exec = async () => {
//             return await request(server).get('/users/?keyword='+key);
//         }
        

//         // beforeEach(()=>{
//         //     await request(server).post('/auth/').send({'email':'chandi@gmail.com','password':'password'});
//         // })


//         it('should return users relates to the search', async () => {
        
//             key='Dinesh';
                    
//             const res = await exec();

//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("message", "Users found");  

//         });


//         it('should return 400 when given no users found for the search', async () => {
        
//             key="luvi";

//             const res = await exec();

//             expect(res.status).toBe(400);
//             expect(res.body).toHaveProperty("message", "No results found");  

//         });

//     });

//     describe('POST /', () => {

//         let new_user_info;

//         const exec=async()=>{
//             //new user information
//             new_user_info = {firstName:"ram",lastName:"smith", email:"ramii@mail.com", password:"password"};
//             return await request(server).post('/users/').send( new_user_info);
//         }

//         it('should return user registered if register success', async () => {            

//             const res = await exec();
    
//             expect(res.status).toBe(200);
//             expect(res.body).toHaveProperty("message","User successfully registered");
//         });


//         it('should return user exists if already registered', async () => {   
            
//             new_user_info = {firstName:"Dinesh",lastName:"Chandimal", email:"chandi@gmail.com", password:"password"};
//             const res = await exec();
    
//             expect(res.status).toBe(400);
//             expect(res.body).toHaveProperty("message", "User already exists");
//         });

//       });
  
// });
