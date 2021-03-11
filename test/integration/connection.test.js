jest.mock("../../middlewares/authorization", () =>
  jest
    .fn((req, res, next) => next())
    .mockReturnValue({user:6})    

);


const request = require("supertest");

let server;

describe("/users/:userid/connections", () => {
  beforeAll(() => {
    server = require("../../index");
    
  });
  afterAll(async () => {
    server.close();
  });
  

  describe("GET /", () => {
    let userid;

    const exec = async () => {
      userid = 6;
      return await request(server).get("/users/" + userid + "/connections/");
    };

    it("should return connections if exists", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('POST /', () => {

      let recipientid;
      let requesterid;

      const exec=async()=>{
          return await request(server)
                      .post('/users/'+requesterid+'/connections/');
      }

      it('should return Request sent if sending request success', async () => {
          recipientid=10;
          requesterid=28;
          const res = await exec();

          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message","Requeest sent to the user");
      });

      it('should return Request already sent if request already sent', async () => {

          recipientid=6;
          requesterid=33;
          const res = await exec();

          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Request already sent to the user");
      });

    });

  describe('GET /recipientid', () => {

      let requesterid;
      let recipientid;

      const exec=async()=>{
        requesterid=33;
        recipientid=6;
        return await request(server)
                    .get('/users/'+recipientid+'/connections/'+requesterid);
      }

      it('should return connections state for a recipient and a requester', async () => {

          const res = await exec();

          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("results", "pending");

      });

  });

  describe('PUT /:recipientid', () => {

    let recipientid;
    let requesterid;      
    let accept;

    const exec=async()=>{

        return await request(server)
                    .put('/users/'+recipientid+'/connections/'+requesterid)
                    .send({accept});
    }

      it('should return You have accepted the connection if request accepted', async () => {

          recipientid=6;
          requesterid=62;
          accept=true;
          const res = await exec();

          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", "You have accepted the connection");
      });

      it('should return You have rejected the connection if request rejected', async () => {

          recipientid=6;
          requesterid=11;
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


  describe('DELETE /:recipientid', () => {

    let recipientid;
    let requesterid; 

    const exec=async()=>{

        return await request(server)
                    .delete('/users/'+recipientid+'/connections/'+requesterid);
    }

      it('should return Connection removed successfully if request removed', async () => {

          recipientid=6;
          requesterid=21;
          const res = await exec();

          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", "Connection removed successfully");
      });

      it('should return Unable to remove the connection if request remove not success', async () => {

          recipientid=6;
          requesterid=21;
          const res = await exec();

          expect(res.status).toBe(500);
          expect(res.body).toHaveProperty("message", "Unable to remove the connection");
      });

      
  });


});
