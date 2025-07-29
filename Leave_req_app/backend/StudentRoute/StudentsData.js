import Router  from "express";
import { User, Student, LeaveRequest } from "../Database/schema.js";
import authMiddleware from "../authentication/authTokenVerifier.js"; 

const router = Router();

router.get('/dashboard-data', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
   
        if (userRole !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Access is restricted to students.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const studentProfile = await Student.findById(user.profileId).populate('savedTeachers', 'name uniqueId');
        
        if (!studentProfile) {
            return res.status(404).json({ message: 'Student profile not found.' });
        }

        const leaveRequests = await LeaveRequest.find({ studentId: studentProfile._id });

        const dashboardData = {
            profile: studentProfile,
            requests: leaveRequests
        };

        res.status(200).json(dashboardData);

    } catch (error) {
        console.error('Error fetching student dashboard data:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
