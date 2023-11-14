const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/api/tasks');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, tasksController.index);
// router.post('/', ensureLoggedIn, tasksController.create);
router.get('/:id', ensureLoggedIn, tasksController.show);
router.delete('/:id', ensureLoggedIn, tasksController.delete);
router.put('/:id', ensureLoggedIn, tasksController.update);
router.post('/', ensureLoggedIn, tasksController.addTaskToCategory);

module.exports = router;