const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const internshipController = require('../controller/internController');
const companyController = require('../controller/companyController');


//fot students
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

//for internship
router.get('/interns', internshipController.getAllInternships);
router.get('/intern/:id', internshipController.getInternshipById);
router.post('/intern', internshipController.createInternship);
router.put('/intern/:id', internshipController.updateInternship);
router.delete('/intern/:id', internshipController.deleteInternship); // Soft delete
router.delete('/intern/permanent/:id', internshipController.permanentlyDeleteInternship); // Permanent delete

//for company
router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.post('/companies', companyController.createCompany);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);
router.post('/companies/:id/register', companyController.registerStudentWithCompany); // Student registration with the company
router.post('/companies/applyInternship', companyController.applyForInternship); // Apply for an internship

module.exports = router;