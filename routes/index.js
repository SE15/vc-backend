/**
 * const express = require('express');
const router = express.Router();

// All routes of User
const userRoutes = require('./api/users');

//user routes
router.use('/users', userRoutes);

//user event routes
router.use('/events', userRoutes);

//user event membership routes
router.use('/memberships', userRoutes);

module.exports = router;
 */