const Car = require('../models/Car');

exports.createCar = async (req, res) => {
    const { model, make, color, registrationNo, category } = req.body;
    
    try {
        const newCar = new Car({ model, make, color, registrationNo, category });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('category');
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { model, make, color, registrationNo, category } = req.body;
    try {
        const car = await Car.findById(id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        car.model = model || car.model;
        car.make = make || car.make;
        car.color = color || car.color;
        car.registrationNo = registrationNo || car.registrationNo;
        car.category = category || car.category;
        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json({ message: 'Car removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
