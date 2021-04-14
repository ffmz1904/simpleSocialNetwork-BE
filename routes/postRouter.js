const Router = require('express');
const router = new Router();
const postController = require('../controllers/postController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.put('/:id', AuthMiddleware, postController.updatePost);
router.delete('/:id', AuthMiddleware, postController.removePost);

module.exports = router;
