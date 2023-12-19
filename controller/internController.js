const Internship = require('../model/internModel');
const Company = require('../model/companyModel');
const Student = require('../model/studentModel');
// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find().populate('company', 'name'); // Assuming you want to populate the 'company' field with 'name'
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific internship by ID
exports.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('company', 'name');
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create an internship
exports.createInternship = async (req, res) => {
  const { title, description, startDate, endDate, company } = req.body;
  try {
    const newInternship = new Internship({ title, description, startDate, endDate, company });
    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an internship by ID
exports.updateInternship = async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Soft delete an internship by ID
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship soft deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Permanently delete an internship by ID
exports.permanentlyDeleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json({ message: 'Internship permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
