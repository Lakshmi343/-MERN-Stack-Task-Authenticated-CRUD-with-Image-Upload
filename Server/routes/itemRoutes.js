const express = require('express');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

router.post('/', auth, upload.single('image'), createItem);
router.get('/', auth, getItems);
router.put('/:id', auth, upload.single('image'), updateItem);
router.delete('/:id', auth, deleteItem);


module.exports = router;
