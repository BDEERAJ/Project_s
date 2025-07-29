import express from 'express';
import cors from 'cors';

import TeacherAuth from './authentication/TeacherAuth.js';
import StudentAuth from './authentication/studentAuth.js';
import StudentDataRoutes from './StudentRoute/StudentsData.js'; 
import TeacherDataRoutes from './TeacherRoute/TeachersData.js'; 
import StudentTaskRoutes from './StudentRoute/StudentTasks.js'; 
import TeacherTaskRoutes from './TeacherRoute/TeacherTasks.js'; 


const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/auth/teacher', TeacherAuth);
app.use('/auth/student', StudentAuth);

app.use('/data/student', StudentDataRoutes);
app.use('/data/teacher', TeacherDataRoutes);

app.use('/tasks/student', StudentTaskRoutes);
app.use('/tasks/teacher', TeacherTaskRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});
