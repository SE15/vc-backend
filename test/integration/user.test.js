jest.mock('../../middlewares/guest-access', () => jest.fn((req, res, next) => next()));
jest.mock("../../middlewares/authorization", () =>
  jest.fn((req, res, next) => {
    req.user = 47;
    next();
  })
);

const request = require("supertest");
const {UserModel} = require('../../models/user-model');

let server;

describe("/users/:userid", () => {
  
    beforeAll(() => {
    server = require("../../index");
    
  });
  
  afterAll(async () => {
    server.close();
  });

  describe("DELETE /", () => {
    let userid;

    const exec = async () => {     
      return await request(server).delete("/users/" + userid );
    };

    it("should return 200 if the user account was deleted successfully", async () => {
      userid = 47;  
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "User successfully deleted"); 
    });

    it("should return 500 if an error genarates", async () => {
      userid = 47;
      const res = await exec();
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Unable to delete the account"); 
    });

    it("should return 401 if it is not authorized to delete the account", async () => {
      userid = 2; 
      const res = await exec();
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("message", "Not authorized"); 
    });  
  });

  describe("PUT /", ()=>{
    let userid;
    let information;

    const exec = async () => { 
      userid = 47;
          
      return await request(server).put("/users/" + userid ).send(information);
    };

    it("should return 200 if the profile is updated successfully", async () => {
      information = {method:'edit-info', first_name:'Janithri'};
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Successfully updated the profile"); 
    });

    it("should return 500 if an error genarates when updating the profile", async () => {
      information={method:'edit-info'};
      const res = await exec();
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Unable to update the profile"); 
    });

    it("should return 200 if the password is updated successfully", async () => {
      information = {method:'change-password', oldPass:'123', newPass:'12345'};
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Successfully changed the password"); 
    });

    it("should return 500 if an error geneartes when updating the password", async () => {
      information = {method:'change-password', oldPass:'1234', newPass:'12345'};
      const res = await exec();
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Invalid password"); 
    });

    it("should return 200 if profile picture updated successfully", async () => {
      /*information = {method:'change-profile-pic',file:{filename:'example.jpg'}};
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Successfully changed the profile picture");*/ 
    });

    it("should return 500 if if an error genarates when updating the profile picture", async () => {
      /*information = {method:'change-profile-pic',file:{filename:'example.jpg'}};
      const res = await exec();
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty("message", "Unable to change the profile picture");*/ 
    });
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
  });
});  