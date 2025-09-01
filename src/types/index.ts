export interface User {
  id: string;
  email: string;
  role: 'mentor' | 'mentee';
  profile: UserProfile;
}

export interface UserProfile {
  fullName: string;
  contactNumber: string;
  department: string;
  avatar?: string;
}

export interface StudentProfile extends UserProfile {
  address: string;
  dateOfBirth: string;
  yearOfAdmission: string;
  passOutYear: string;
  motherName: string;
  fatherName: string;
  fatherContact: string;
  motherContact: string;
  hobbies: string[];
  feesStructure: FeesStructure;
  semesterResults: SemesterResult[];
  overallAttendance: number;
}

export interface FeesStructure {
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  lastPaymentDate: string;
}

export interface SemesterResult {
  semester: number;
  marks: number;
  grade: string;
  year: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  mentorId: string;
  mentorName: string;
  attendees: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  topic?: string;
  issues?: string;
}

export interface Attendance {
  id: string;
  meetingId: string;
  studentId: string;
  studentName: string;
  status: 'present' | 'absent';
  absentReason?: string;
  markedAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'staff' | 'teaching' | 'infrastructure' | 'other';
  status: 'submitted' | 'under_review' | 'resolved';
  submittedAt: string;
  actions: ComplaintAction[];
}

export interface ComplaintAction {
  id: string;
  complaintId: string;
  action: string;
  takenBy: string;
  takenAt: string;
  status: string;
}

export interface DashboardStats {
  totalMeetings: number;
  completedMeetings: number;
  totalStudents: number;
  averageAttendance: number;
  pendingComplaints: number;
}