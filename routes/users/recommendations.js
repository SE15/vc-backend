const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/authorization');

const { submitRecommendation } = require('../../controllers/recommendations-controller');

router.post('/', authorization, submitRecommendation);

module.exports = router;