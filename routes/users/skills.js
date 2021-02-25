const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/authorization');

const {addSkill, removeSkill, validateSkill} = require('../../controllers/skills-controller');

router.post('/', authorization, addSkill);
router.delete('/:skillid', authorization, removeSkill);
router.put('/:skillid', authorization, validateSkill);

module.exports = router;