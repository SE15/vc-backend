const router = require('express').Router();
const authorization = require('../../middlewares/authorization');
const guestAccess = require('../../middlewares/guest-access');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        const extensions = file.originalname.split('.');
        imageExtension = extensions[extensions.length - 1];
        cb(null, `user${req.user}.${imageExtension}`);
    }
})
const upload = multer({ storage: storage }).single('picture');

const { searchUser, createAccount, viewProfile, deleteAccount, editProfile } = require('../../controllers/users-controller');

router.use('/:userid/connections', require('./connections'));
router.use('/:userid/recommendations', require('./recommendations'));
router.use('/:userid/skills', require('./skills'));

router.get('/', guestAccess, authorization, searchUser);
router.post('/', createAccount);

router.get('/:userid', guestAccess, authorization, viewProfile);
router.delete('/:userid', authorization, deleteAccount);
router.put('/:userid', authorization, upload, editProfile);

module.exports = router;