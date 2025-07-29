import { Router } from "express";
import { User, Student, Teacher, LeaveRequest } from "../Database/schema.js"; 
import authMiddleware from "../authentication/authTokenVerifier.js"; 

const router = Router();

router.put('/add-teacher', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { uniqueId, passkey } = req.body;

        if (!uniqueId || !passkey) {
            return res.status(400).json({ message: 'Teacher uniqueId and passkey are required.' });
        }

        if (userRole !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Only students can add teachers.' });
        }

        const teacher = await Teacher.findOne({ uniqueId, passkey });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found with the provided credentials.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Student user not found.' });
        }

        const studentProfile = await Student.findById(user.profileId);
        if (studentProfile.savedTeachers.includes(teacher._id)) {
            return res.status(409).json({ message: 'Teacher is already in your saved list.' });
        }

        await Student.updateOne(
            { _id: user.profileId },
            { $addToSet: { savedTeachers: teacher._id } }
        );

        res.status(200).json({ message: 'Teacher added successfully!' });

    } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.put('/submit-request', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        const { teacherId, reason } = req.body;

        if (!teacherId || !reason) {
            return res.status(400).json({ message: 'A teacher and a reason are required.' });
        }

        if (userRole !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Only students can submit requests.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Student user not found.' });
        }

        const newLeaveRequest = new LeaveRequest({
            studentId: user.profileId, 
            teacherId: teacherId,     
            reason: reason,
            status: 'Pending'        
        });

        await newLeaveRequest.save();
        res.status(201).json({ message: 'Leave request submitted successfully!' });
    } catch (error) {
        console.error('Error submitting leave request:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
