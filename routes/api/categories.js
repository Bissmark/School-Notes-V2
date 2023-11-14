const express = require('express');
const router = express.Router();
const categoriesController = require('../../controllers/api/categories');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, categoriesController.create);
router.get('/', ensureLoggedIn, categoriesController.index);
router.get('/:id', ensureLoggedIn, categoriesController.show);
router.delete('/', ensureLoggedIn, categoriesController.delete);
router.put('/', ensureLoggedIn, categoriesController.updatePositions);

module.exports = router;