const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/authorization');

const { addConnection, respondConnection, removeConnection, getConnectionRequests, getConnectionStatus } = require('../../controllers/connections-controller');

router.get('/', authorization, getConnectionRequests);
router.post('/',authorization, addConnection);

router.get('/:recipientid', authorization, getConnectionStatus);
router.put('/:recipientid',authorization, respondConnection);
router.delete('/:recipientid', authorization, removeConnection);

module.exports = router;