import { Router } from "express";
import { User, Teacher, LeaveRequest } from "../Database/schema.js";
import authMiddleware from "../authentication/authTokenVerifier.js"; 

const router = Router();

router.get('/dashboard-data', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        if (userRole !== 'teacher') {
            return res.status(403).json({ message: 'Forbidden: Access is restricted to teachers.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }


        const teacherProfile = await Teacher.findById(user.profileId).select('name uniqueId passkey');
        
        if (!teacherProfile) {
            return res.status(404).json({ message: 'Teacher profile not found.' });
        }

        const leaveRequests = await LeaveRequest.find({ teacherId: teacherProfile._id })
            .populate('studentId', 'name rollNo group year'); 

        const dashboardData = {
            profile: teacherProfile,
            requests: leaveRequests
        };

        res.status(200).json(dashboardData);

    } catch (error) {
        console.error('Error fetching teacher dashboard data:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
