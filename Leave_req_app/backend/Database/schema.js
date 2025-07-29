import mongoose from './mongoose.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'teacher']
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'roleModel'
    },
    roleModel: {
        type: String,
        required: true,
        enum: ['Student', 'Teacher']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true,
        unique: true
    },
    savedTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }]
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);


const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    passkey: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);


const leaveRequestSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    requestDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);


export { User, Student, Teacher, LeaveRequest };
