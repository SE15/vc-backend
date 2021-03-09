const request = require('supertest');

let server;

describe('/users/:userid/connections', () => {
    beforeAll(() => { 
        server = require('../../index'); 
    });
    afterAll(async () => { 
        server.close();
    });

    // describe('GET /', () => {

    //     let userid;

    //     const exec=async()=>{  
    //         userid=6;          
    //         return await request(server)
    //                     .get('/users/'+userid+'/connections/');
    //     }
                
    //     it('should return connections if exists', async () => { 
                        
    //         const res = await exec();
    
    //         expect(res.status).toBe(200);
            
    //     });
        

    // });

    // describe('POST /', () => {

    //     let recipientid;
    //     let user;

    //     const exec=async()=>{            
    //         return await request(server)
    //                     .post('/users/'+recipientid+'/connections/')
    //                     .send({user});
    //     }
                
    //     it('should return Request sent if sending request success', async () => { 
    //         recipientid=10;  
    //         user=28;
    //         const res = await exec();
    
    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty("message","Requeest sent to the user");
    //     });


    //     it('should return Request already sent if request already sent', async () => {   
            
    //         recipientid=6;  
    //         user=33;
    //         const res = await exec();
    
    //         expect(res.status).toBe(400);
    //         expect(res.body).toHaveProperty("message", "Request already sent to the user");
    //     });

    //   });

    // describe('GET /recipientid', () => {

    //     let userid;
    //     let recipientid;

    //     const exec=async()=>{  
    //         userid=33;
    //         recipientid=6;         
    //         return await request(server)
    //                     .get('/users/'+userid+'/connections/'+recipientid);
    //     }
                
    //     it('should return connections state for a recipient and a requester', async () => { 
                        
    //         const res = await exec();
    
    //         expect(res.status).toBe(200);
    //         expect(res.body).toHaveProperty("results", "accepted");

    //     });      

    // });


    describe('PUT /:recipientid', () => {

        let userid;
        let recipientid;
        let accept;

        const exec=async()=>{  
                   
            return await request(server)
                        .put('/users/'+userid+'/connections/'+recipientid)
                        .send({accept});
        }
        
        it('should return You have accepted the connection if request accepted', async () => {   
            
            recipientid=6;  
            userid=62;
            accept=true;
            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message", "You have accepted the connection");
        });


        it('should return You have rejected the connection if request rejected', async () => {   
            
            recipientid=30;  
            userid=33;
            accept=false;
            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("message", "You have rejected the connection");
        });

        it('should return Unable to respond to connection if error occured', async () => {   
            
            recipientid='';  
            userid='';
            accept='';
            const res = await exec();
    
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty("message", "Unable to respond to connection");
        });
        
    }); 



  
});
