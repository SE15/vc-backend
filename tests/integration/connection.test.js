const request = require('supertest');

let server;

describe('/users/:id/connections', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(async () => { 
        server.close(); 
    });

    describe('POST /', () => {

        let request_id;
        let recipient_id;

        const exec=async()=>{
            request_id=1;
            recipient_id=30;
            return await request(server).post('/users/'+request_id+'/connections/').send({recipient_id:recipient_id.toString()});
        }

        it('should return Request sent if sending request success', async () => {            

            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("msg","Request sent");
        });


        it('should return Request already sent if request already sent', async () => {   
            
            request_id=11;
            recipient_id=2;
            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("msg", "Request already sent");
        });

      });
  
});
