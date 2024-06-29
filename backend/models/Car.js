const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    model: { 
        type: String, 
        required: true 
    },
    make: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        required: true 
    },
    registrationNo: { 
        type: String, 
        required: true, 
        unique: true 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Car', CarSchema);
