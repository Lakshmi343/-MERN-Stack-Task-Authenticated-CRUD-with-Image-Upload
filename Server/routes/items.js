const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const itemController = require('../controllers/itemController');

router.post('/', auth, upload.single('image'), itemController.createItem);
router.get('/', auth, itemController.getItems);
router.get('/:id', auth, itemController.getItem);
router.put('/:id', auth, upload.single('image'), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router;