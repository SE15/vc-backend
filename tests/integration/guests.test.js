const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');

let server;

describe('/users', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
    });

    describe('GET /:id', () => {

        let token; 
        let id; 

        const exec = async () => {
            return await request(server)
                .get('/users/' + id)
                .set('x-auth-token', token);
        }

        beforeEach(()=>{
            token=token=jwt.sign(
                { auth_id: 1 },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
            );
        })

        it('should return a guest if valid id is passed', async () => {
        
        id=1;
                 
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("obj", [[{"first_name": "Dinesh","last_name": "Chandimal","profile_pic": null,}],[],[],[]]);  

        });


        it('should return an empty guest with the given id that not exists', async () => {
        
        id=253;

        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("obj", [[],[],[],[]]); 
        });

    });

    describe('POST /', () => {

        let new_user_info;

        const exec=async()=>{
            new_user_info = {firstName:"sachi",lastName:"sena", email:"senaa@mail.com", password:"password"};
            return await request(server).post('/users/').send( new_user_info);
        }

        it('should return user registered if register success', async () => {            

            const res = await exec();
    
            expect(res.status).toBe(200);
            //expect(res.body).toHaveProperty("msg","User successfully registered");
        });


        it('should return user exists if already registered', async () => {   
            
            new_user_info = {firstName:"Dinesh",lastName:"Chandimal", email:"chandi@gmail.com", password:"password"};
            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("msg", "User already exists");
        });

      });
  
});
