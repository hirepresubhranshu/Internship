const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
});
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
