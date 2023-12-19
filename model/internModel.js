const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true, 
    }
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;