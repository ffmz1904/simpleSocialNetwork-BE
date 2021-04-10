const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);

router.get('/test', AuthMiddleware, (req, res) => {
   res.status(200).json({
       message: 'ok => you are authorized!',
       user: req.user
   });
});

module.exports = router;
