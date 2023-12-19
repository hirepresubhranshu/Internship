const Company = require('../model/companyModel');
const Student = require('../model/studentModel');
const Internship = require('../model/internModel');
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");
exports.registerStudentWithCompany = async (req, res) => {
    const { companyId, name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({ companyId, name, email, password: hashedPassword });

        // Save the new student
        await newStudent.save();

        // Find the company by ID
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Associate the student with the company
        company.students.push(newStudent._id);
        await company.save();

        // Store the company ID in the student's record
        newStudent.company = companyId;
        await newStudent.save();

        // Update the companyId field in the Company document
        if (!company.companyId) {
            company.companyId = companyId;
            await company.save();
        }

        res.status(200).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.applyForInternship = async (req, res) => {
    const { studentId, internshipId } = req.body;

    try {
        const student = await Student.findById(studentId);
        const internship = await Internship.findById(internshipId);

        console.log('Student:', student);
        console.log('Internship:', internship);

       if (!student || !internship) {
            return res.status(404).json({ message: 'Invalid student or internship' });
        }

        // Ensure both student and internship have a company associated
        if (!student.company || !internship.company) {
            return res.status(400).json({ message: 'Student or internship has no associated company' });
        }

        // Check if the student's company ID matches the internship's company ID
        if (student.company.toString() !== internship.company.toString()) {
            return res.status(400).json({ message: 'Student is not associated with this company' });
        }

        // Check if the student has already applied for this internship
        if (student.appliedInternships && student.appliedInternships.includes(internshipId)) {
            return res.status(400).json({ message: 'Student has already applied for this internship' });
        }

        // Add the internship ID to student's appliedInternships
        if (!student.appliedInternships) {
            student.appliedInternships = [];
        }
        student.appliedInternships.push(internshipId);
        await student.save();

        res.json({ message: 'Internship applied successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a company
exports.createCompany = async (req, res) => {
  const { name, industry, location, email, password } = req.body;
  try {
    const newCompany = new Company({ name, industry, location, email, password });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
