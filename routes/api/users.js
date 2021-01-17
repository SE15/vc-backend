const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');

//user routes
router.get('/users/', userController.searchUsers);
router.get('/users/:id', userController.viewProfile);
router.post('/users/skills/add', userController.addSkill);
router.delete('/users/skills/:id', userController.removeSkill);
router.put('/users/skills/:id', userController.validateSkill);
router.post('/users/connections/add/:id', userController.addConnection);
router.put('/users/connections/respond/:id', userController.respondConnection);
router.delete('/users/connections/:id', userController.removeConnection);
router.post('/users/recommendations/:id', userController.submitRecommendation);
router.delete('/users/', userController.deleteAccount);
router.put('/users/changepwd', userController.changePassword);
router.put('/users/edit', userController.editProfile);

//user event routes
router.get('/events/', userController.searchEvents);
router.get('/events/:id', userController.viewEvent);
router.put('/events/:id/join', userController.joinEvent);
router.put('/events/:id/leave', userController.leaveEvent);
router.put('/events/:id', userController.updateEvent);
router.delete('/events/:id', userController.deleteEvent);

//user event membership routes
router.put('/memberships/:id', userController.updateRole);
router.put('/memberships/acceptRequest/:id', userController.acceptEventRequest);

module.exports = router;