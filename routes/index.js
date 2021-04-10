const Router = require('express');

const router = new Router();

router.get('/', (req, res) => { res.status(200).json('test route') });

module.exports = router;
