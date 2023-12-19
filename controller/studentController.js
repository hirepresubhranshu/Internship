const Student = require('../model/studentModel');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a student
exports.createStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newStudent = new Student({ name, email, password });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-------------------------------------------------login user-----------------------------------------//
exports.loginStudent = async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ mail });

   if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    //Send the token in the responseS
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
};