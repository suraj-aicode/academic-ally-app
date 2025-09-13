import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Layout/Navbar";
import { User, Mail, Phone, Calendar, BookOpen, TrendingUp, FileText, MessageCircle } from "lucide-react";
import { useParams, Link } from "react-router-dom";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mockStudentDetails = {
  id: "1",
  name: "John Smith",
  email: "john.smith@student.edu",
  phone: "+1 234 567 8901",
  enrollmentNumber: "CS2021001",
  year: "3rd Year",
  department: "Computer Science",
  dateOfBirth: "2002-05-15",
  address: "123 Student Ave, University City, UC 12345",
  motherName: "Jane Smith",
  fatherName: "Robert Smith",
  fatherContact: "+1 234 567 8906",
  motherContact: "+1 234 567 8907",
  hobbies: ["Programming", "Basketball", "Reading"],
  overallAttendance: 86,
  
  // Academic Performance
  gpa: 3.7,
  credits: 95,
  semesterResults: [
    { semester: 1, marks: 85, grade: "A", year: "2021" },
    { semester: 2, marks: 82, grade: "A-", year: "2021" },
    { semester: 3, marks: 88, grade: "A", year: "2022" },
    { semester: 4, marks: 79, grade: "B+", year: "2022" },
    { semester: 5, marks: 91, grade: "A+", year: "2023" },
    { semester: 6, marks: 87, grade: "A", year: "2023" }
  ],

  // Meeting History
  meetingHistory: [
    { id: "1", title: "Weekly Progress Review", date: "2024-01-15", status: "attended", type: "individual" },
    { id: "2", title: "Career Guidance Session", date: "2024-01-08", status: "attended", type: "group" },
    { id: "3", title: "Project Discussion", date: "2024-01-01", status: "absent", type: "individual", reason: "Illness" },
    { id: "4", title: "Academic Planning", date: "2023-12-25", status: "attended", type: "individual" }
  ],

  // Fees Information
  feesStructure: {
    totalFees: 50000,
    paidAmount: 35000,
    pendingAmount: 15000,
    lastPaymentDate: "2024-01-01"
  }
};

const StudentDetails = () => {
  const { studentId } = useParams();
  const student = mockStudentDetails; // In real app, fetch by studentId

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "attended":
        return <Badge variant="default">Attended</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{student.name}</h1>
              <p className="text-muted-foreground">{student.enrollmentNumber} • {student.year} • {student.department}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link to={`/mentor/schedule?student=${student.id}`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Link>
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.overallAttendance}%</div>
              <Progress value={student.overallAttendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.gpa}</div>
              <p className="text-xs text-muted-foreground">{student.credits} credits completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{student.meetingHistory.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{student.feesStructure.pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Pending amount</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="mt-1">{student.dateOfBirth}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Address</label>
                  <p className="mt-1 text-sm">{student.address}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Hobbies</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {student.hobbies.map((hobby, index) => (
                      <Badge key={index} variant="outline">{hobby}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Family Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Father's Name</label>
                  <p className="mt-1">{student.fatherName}</p>
                  <p className="text-sm text-muted-foreground">{student.fatherContact}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Mother's Name</label>
                  <p className="mt-1">{student.motherName}</p>
                  <p className="text-sm text-muted-foreground">{student.motherContact}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Academic & Meeting Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {student.semesterResults.map((result) => (
                    <div key={`${result.semester}-${result.year}`} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Semester {result.semester}</span>
                        <Badge variant="outline">{result.year}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Marks:</span>
                          <span className="font-medium">{result.marks}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Grade:</span>
                          <span className={`font-medium ${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meeting History */}
            <Card>
              <CardHeader>
                <CardTitle>Meeting History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {student.meetingHistory.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {meeting.date}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {meeting.type}
                          </Badge>
                        </div>
                        {meeting.reason && (
                          <p className="text-sm text-muted-foreground mt-1">Reason: {meeting.reason}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(meeting.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fee Information */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground">Total Fees</h4>
                    <p className="text-lg font-bold">₹{student.feesStructure.totalFees.toLocaleString()}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground">Paid Amount</h4>
                    <p className="text-lg font-bold text-green-600">₹{student.feesStructure.paidAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm text-muted-foreground">Pending Amount</h4>
                    <p className="text-lg font-bold text-red-600">₹{student.feesStructure.pendingAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Last Payment: {student.feesStructure.lastPaymentDate}
                  </p>
                  <Progress 
                    value={(student.feesStructure.paidAmount / student.feesStructure.totalFees) * 100} 
                    className="mt-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;