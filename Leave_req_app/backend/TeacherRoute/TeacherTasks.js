import { Router } from "express";
import { User, Teacher, LeaveRequest } from "../Database/schema.js";
import authMiddleware from "../authentication/authTokenVerifier.js"; 

const router = Router();

router.patch('/update-request-status/:requestId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        const { requestId } = req.params;
        const { status } = req.body;

        if (!status || !['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'A valid status ("Approved" or "Rejected") is required.' });
        }

        if (userRole !== 'teacher') {
            return res.status(403).json({ message: 'Forbidden: Only teachers can update requests.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Teacher user not found.' });
        }
        const teacherProfileId = user.profileId;

        const leaveRequest = await LeaveRequest.findById(requestId);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found.' });
        }

        if (leaveRequest.teacherId.toString() !== teacherProfileId.toString()) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to update this request.' });
        }

        if (leaveRequest.status !== 'Pending') {
            return res.status(409).json({ message: `This request has already been ${leaveRequest.status.toLowerCase()} and cannot be changed.` });
        }

        leaveRequest.status = status;
        await leaveRequest.save();

        res.status(200).json({ message: `Request has been successfully ${status.toLowerCase()}.` });

    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
