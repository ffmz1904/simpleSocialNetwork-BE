const Router = require('express');
const router = new Router();
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);

module.exports = router;
