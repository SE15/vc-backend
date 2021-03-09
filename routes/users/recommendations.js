const router = require('express').Router({mergeParams: true});
const authorization = require('../../middlewares/authorization');

const { submitRecommendation } = require('../../controllers/recommendations-controller');

router.post('/', authorization, submitRecommendation);

module.exports = router;