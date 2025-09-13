import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Layout/Navbar";
import { TrendingUp, Users, Calendar, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const attendanceRecords = [
  { 
    studentId: "1", 
    studentName: "John Smith", 
    totalMeetings: 28, 
    attendedMeetings: 24, 
    attendancePercentage: 86, 
    lastAttendance: "2024-01-15" 
  },
  { 
    studentId: "2", 
    studentName: "Emma Davis", 
    totalMeetings: 28, 
    attendedMeetings: 26, 
    attendancePercentage: 93, 
    lastAttendance: "2024-01-15" 
  },
  { 
    studentId: "3", 
    studentName: "Alex Johnson", 
    totalMeetings: 28, 
    attendedMeetings: 20, 
    attendancePercentage: 71, 
    lastAttendance: "2024-01-10" 
  },
  { 
    studentId: "4", 
    studentName: "Sarah Wilson", 
    totalMeetings: 28, 
    attendedMeetings: 27, 
    attendancePercentage: 96, 
    lastAttendance: "2024-01-15" 
  },
  { 
    studentId: "5", 
    studentName: "Mike Brown", 
    totalMeetings: 28, 
    attendedMeetings: 22, 
    attendancePercentage: 79, 
    lastAttendance: "2024-01-12" 
  }
];

const getAttendanceColor = (percentage: number) => {
  if (percentage >= 90) return "text-green-600";
  if (percentage >= 75) return "text-yellow-600";
  return "text-red-600";
};

const getAttendanceBadge = (percentage: number) => {
  if (percentage >= 90) return "default";
  if (percentage >= 75) return "secondary";
  return "destructive";
};

const AttendanceAnalytics = () => {
  const overallStats = {
    totalStudents: attendanceRecords.length,
    averageAttendance: Math.round(attendanceRecords.reduce((sum, record) => sum + record.attendancePercentage, 0) / attendanceRecords.length),
    excellentAttendance: attendanceRecords.filter(r => r.attendancePercentage >= 90).length,
    poorAttendance: attendanceRecords.filter(r => r.attendancePercentage < 75).length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Analytics</h1>
          <p className="text-muted-foreground">Comprehensive attendance tracking and student performance analysis.</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Under your mentorship</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallStats.averageAttendance}%</div>
              <Progress value={overallStats.averageAttendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excellent Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{overallStats.excellentAttendance}</div>
              <p className="text-xs text-muted-foreground">90% or above</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{overallStats.poorAttendance}</div>
              <p className="text-xs text-muted-foreground">Below 75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Attendance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Attendance Records</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/mentor/attendance">
                    Mark Attendance
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Total Meetings</TableHead>
                  <TableHead>Attended</TableHead>
                  <TableHead>Attendance %</TableHead>
                  <TableHead>Last Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.studentId}>
                    <TableCell className="font-medium">
                      <Link 
                        to={`/mentor/student/${record.studentId}`} 
                        className="text-primary hover:underline"
                      >
                        {record.studentName}
                      </Link>
                    </TableCell>
                    <TableCell>{record.totalMeetings}</TableCell>
                    <TableCell>{record.attendedMeetings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getAttendanceColor(record.attendancePercentage)}`}>
                          {record.attendancePercentage}%
                        </span>
                        <Progress value={record.attendancePercentage} className="w-20 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>{record.lastAttendance}</TableCell>
                    <TableCell>
                      <Badge variant={getAttendanceBadge(record.attendancePercentage)}>
                        {record.attendancePercentage >= 90 ? "Excellent" : 
                         record.attendancePercentage >= 75 ? "Good" : "Poor"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/mentor/student/${record.studentId}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendanceRecords
                  .filter(r => r.attendancePercentage < 75)
                  .map(student => (
                    <div key={student.studentId} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{student.studentName}</span>
                      <Badge variant="destructive">{student.attendancePercentage}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendanceRecords
                  .filter(r => r.attendancePercentage >= 90)
                  .slice(0, 3)
                  .map(student => (
                    <div key={student.studentId} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{student.studentName}</span>
                      <Badge variant="default">{student.attendancePercentage}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Last meeting: Jan 15, 2024</div>
                <div className="text-sm text-muted-foreground">Students attended: 24/28</div>
                <div className="text-sm text-muted-foreground">Attendance rate: 86%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;