const express = require('express');
const {
    createCar,
    getCars,
    updateCar,
    deleteCar,
} = require('../controllers/carController');

const auth = require('../middleware/auth');  // Import the auth middleware

const router = express.Router();

router.post('/', auth, createCar);
router.get('/', auth, getCars);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;
