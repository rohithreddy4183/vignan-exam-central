
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/vignanExams', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
  name: String,
  regNumber: String,
  email: String,
  class: String,
  group: String
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const assessmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['T1', 'T2', 'T3'], required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  deadline: { type: Date, required: true },
  description: String,
  questions: [String]
});

const submissionSchema = new mongoose.Schema({
  assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  files: [{
    filename: String,
    path: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: Date
  }],
  submissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
  feedback: String,
  grade: Number
});

// Create models
const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Assessment = mongoose.model('Assessment', assessmentSchema);
const Submission = mongoose.model('Submission', submissionSchema);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// API Routes

// User authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    if (password === user.password) {
      // In a real app, never return passwords
      const userData = {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
        regNumber: user.regNumber,
        class: user.class,
        group: user.group
      };
      
      return res.json({ success: true, user: userData });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// File upload endpoint
app.post('/api/submissions/upload', upload.array('files', 5), async (req, res) => {
  try {
    const { assessmentId, groupId } = req.body;
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      uploadDate: new Date()
    }));
    
    const submission = new Submission({
      assessment: assessmentId,
      group: groupId,
      files,
      submissionDate: new Date(),
      status: 'pending'
    });
    
    await submission.save();
    res.json({ success: true, submission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assessments for a class
app.get('/api/assessments/class/:className', async (req, res) => {
  try {
    const assessments = await Assessment.find({ class: req.params.className });
    res.json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get submissions for an assessment
app.get('/api/submissions/assessment/:assessmentId', async (req, res) => {
  try {
    const submissions = await Submission.find({ assessment: req.params.assessmentId })
      .populate('group')
      .exec();
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed initial data
async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('Seeding initial data...');
      
      // Create admin user
      await User.create({
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User',
        email: 'admin@vignan.ac.in'
      });
      
      // Create student users
      const student1 = await User.create({
        username: '21BCE7777',
        password: 'student123',
        role: 'student',
        name: 'John Doe',
        regNumber: '21BCE7777',
        class: 'CSE-A',
        email: 'john.doe@vignan.ac.in'
      });
      
      const student2 = await User.create({
        username: '21BCE7778',
        password: 'student123',
        role: 'student',
        name: 'Jane Smith',
        regNumber: '21BCE7778',
        class: 'CSE-A',
        email: 'jane.smith@vignan.ac.in'
      });
      
      // Create sample group
      const group = await Group.create({
        name: 'Group A-3',
        class: 'CSE-A',
        members: [student1._id, student2._id]
      });
      
      // Create sample assessments
      const t1 = await Assessment.create({
        type: 'T1',
        title: 'Implement a responsive web application using React',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-05-15'),
        description: 'Create a responsive React application with at least 3 pages and proper routing.',
        questions: [
          'Implement a login page with form validation',
          'Create a dashboard with at least 3 widgets showing different data visualizations',
          'Implement responsive design that works on mobile and desktop'
        ]
      });
      
      const t2 = await Assessment.create({
        type: 'T2',
        title: 'Add user authentication and database integration to your web app',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-05-25'),
        description: 'Extend your T1 application by adding authentication and database functionality.',
        questions: [
          'Implement JWT-based authentication',
          'Add database connection for persistent data storage',
          'Create a user profile page with editable fields'
        ]
      });
      
      const t3 = await Assessment.create({
        type: 'T3',
        title: 'Create a presentation and IEEE paper on your web application',
        subject: 'Web Technologies',
        class: 'CSE-A',
        deadline: new Date('2025-06-05'),
        description: 'Present your application and document it according to IEEE format.',
        questions: [
          'Create a 10-slide presentation about your application',
          'Write a 5-page IEEE format paper documenting your development process',
          'Prepare a 5-minute demo video showcasing the application features'
        ]
      });
      
      console.log('Initial data seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedInitialData();
});
