const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', AuthMiddleware, userController.check);
router.post('/subscribe_request', AuthMiddleware, userController.create_subscribe_request);
router.post('/confirm_subscribe_request', AuthMiddleware, userController.confirm_subscribe_request);

router.get('/test', AuthMiddleware, (req, res) => {
   res.status(200).json({
       message: 'ok => you are authorized!',
       user: req.user
   });
});

module.exports = router;
