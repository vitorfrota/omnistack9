const mongoose = require('mongoose');

// "CLASSE" para reservas dos usuários
const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});


module.exports = mongoose.model('Booking', BookingSchema);