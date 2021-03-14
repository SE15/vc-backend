jest.mock('../../middlewares/authorization', () => jest.fn((req, res, next) => next()));
jest.mock('../../middlewares/guest-access', () => jest.fn((req, res, next) => next()));

const request = require('supertest');

let server;

describe('/users/:userid', () => {

    beforeAll(() => { 
        server = require('../../index'); 
    });
    afterAll(async () => { 
        server.close();
    });
    
    describe('GET /', () => {

        
        let userid;

        const exec = async () => {
            return await request(server).get('/users/' +userid);
        }
        

        it('should return user profile related to userid', async () => {
        
            userid=6;
                    
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message", "User found");  

        });


        /*it('should return 400 when given no users found for the search', async () => {
        
            key="luvi";

            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("message", "No results found");  

        });*/

    });

});