const router = require('express').Router({mergeParams: true});
const authorization = require('../../middlewares/authorization');

const { addConnection, respondConnection, removeConnection, getConnectionRequests, getConnectionStatus } = require('../../controllers/connections-controller');

router.get('/', getConnectionRequests);
router.post('/', addConnection);

router.get('/:recipientid', getConnectionStatus);
router.put('/:recipientid', respondConnection);
router.delete('/:recipientid', removeConnection);


// router.get('/', authorization, getConnectionRequests);
// router.post('/',authorization, addConnection);

// router.get('/:recipientid', authorization, getConnectionStatus);
// router.put('/:recipientid',authorization, respondConnection);
// router.delete('/:recipientid', authorization, removeConnection);

module.exports = router;