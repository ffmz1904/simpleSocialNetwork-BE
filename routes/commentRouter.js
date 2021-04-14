const Router = require('express');
const router = new Router();
const commentController = require('../controllers/commentController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, commentController.createComment);
router.get('/', commentController.getAllComments);
router.delete('/:id', AuthMiddleware, commentController.removeComment);

module.exports = router;
