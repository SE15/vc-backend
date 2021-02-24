const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const userController = require('../../controllers/userController');

//user routes
router.get('/users/', authorization, userController.searchUser);
router.get('/users/:userid', authorization, userController.viewProfile);
router.post('/users/:userid/skills/', authorization, userController.addSkill);
router.delete('/users/:userid/skills/:skillid', authorization, userController.removeSkill);
router.put('/users/:userid/skills/:skillid', authorization, userController.validateSkill);
router.post('/users/:userid/connections/:connectionid',authorization, userController.addConnection);
router.put('/users/:userid/connections/:connectionid',authorization, userController.respondConnection);
router.delete('/users/:userid/connections/:connectionid', authorization, userController.removeConnection);
router.post('/users/:userid/recommendations/:reciverid', authorization, userController.submitRecommendation);
router.delete('/users/:userid', authorization, userController.deleteAccount);
router.put('/users/:userid', authorization, userController.changePassword);
router.post('/users/:userid', authorization, userController.editProfile);

module.exports = router;