const request = require('supertest');
const jwt = require('jsonwebtoken');
const config = require('config');


let server;

describe('/users/:id/connections', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
    });

    describe('POST /', () => {

        const request_id=2;
        let recipient_id;
        let token; 


        const exec=async()=>{            
            recipient_id=30;
            return await request(server)
            .post('/users/'+request_id+'/connections/')
            .send({token});
        }

        
        beforeEach(()=>{
            token=token=jwt.sign(
                { id: request_id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
            );
        })


        it('should return Request sent if sending request success', async () => {            

            const res = await exec();
    
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("msg","Request sent");
        });


        it('should return Request already sent if request already sent', async () => {   
            
           
            recipient_id=19;
            const res = await exec();
    
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message", "Request already sent to the user");
        });

      });
  
});
