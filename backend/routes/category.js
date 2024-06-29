const express = require('express');
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const auth = require('../middleware/auth');  // Import the auth middleware

const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', auth, getCategories);
router.put('/:id', auth, updateCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;
