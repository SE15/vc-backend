const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/authorization');

const { addConnection, respondConnection, removeConnection } = require('../../controllers/connections-controller');

router.post('/', addConnection);
//router.post('/',authorization, addConnection);
router.put('/:recipientid',authorization, respondConnection);
router.delete('/:recipientid', authorization, removeConnection);

module.exports = router;