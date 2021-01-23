const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const userController = require('../../controllers/userController');

//user routes
router.get('/users/', authorization, userController.searchUser);
router.get('/users/:id', authorization, userController.viewProfile);
router.post('/users/skills/add', authorization, userController.addSkill);
router.delete('/users/skills/:id', authorization, userController.removeSkill);
router.put('/users/skills/:id', authorization, userController.validateSkill);
router.post('/users/connections/add/:id',authorization, userController.addConnection);
router.put('/users/connections/respond/:id',authorization, userController.respondConnection);
router.delete('/users/connections/:id', authorization, userController.removeConnection);
router.post('/users/recommendations/:id', authorization, userController.submitRecommendation);
router.delete('/users/', authorization, userController.deleteAccount);
router.put('/users/changepwd', authorization, userController.changePassword);
router.put('/users/edit', authorization, userController.editProfile);

module.exports = router;