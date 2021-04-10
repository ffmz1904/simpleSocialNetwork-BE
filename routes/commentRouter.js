const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, commentController.createComment);

module.exports = router;