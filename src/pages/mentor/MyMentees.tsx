import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Layout/Navbar";
import { User, Mail, Phone, Search, Eye, MessageCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mentees = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@student.edu",
    phone: "+1 234 567 8901",
    year: "3rd Year",
    department: "Computer Science",
    enrollmentNumber: "CS2021001",
    attendanceRate: 86,
    lastMeeting: "2024-01-15",
    totalMeetings: 28,
    status: "active"
  },
  {
    id: "2",
    name: "Emma Davis",
    email: "emma.davis@student.edu",
    phone: "+1 234 567 8902",
    year: "2nd Year",
    department: "Computer Science",
    enrollmentNumber: "CS2022002",
    attendanceRate: 93,
    lastMeeting: "2024-01-15",
    totalMeetings: 26,
    status: "active"
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@student.edu",
    phone: "+1 234 567 8903",
    year: "4th Year",
    department: "Computer Science",
    enrollmentNumber: "CS2020003",
    attendanceRate: 71,
    lastMeeting: "2024-01-10",
    totalMeetings: 28,
    status: "needs_attention"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@student.edu",
    phone: "+1 234 567 8904",
    year: "3rd Year",
    department: "Computer Science",
    enrollmentNumber: "CS2021004",
    attendanceRate: 96,
    lastMeeting: "2024-01-15",
    totalMeetings: 28,
    status: "active"
  },
  {
    id: "5",
    name: "Mike Brown",
    email: "mike.brown@student.edu",
    phone: "+1 234 567 8905",
    year: "2nd Year",
    department: "Computer Science",
    enrollmentNumber: "CS2022005",
    attendanceRate: 79,
    lastMeeting: "2024-01-12",
    totalMeetings: 26,
    status: "active"
  }
];

const MyMentees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentees, setFilteredMentees] = useState(mentees);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = mentees.filter(mentee =>
      mentee.name.toLowerCase().includes(value.toLowerCase()) ||
      mentee.enrollmentNumber.toLowerCase().includes(value.toLowerCase()) ||
      mentee.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMentees(filtered);
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return "text-green-600";
    if (rate >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "needs_attention":
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const stats = {
    totalMentees: mentees.length,
    averageAttendance: Math.round(mentees.reduce((sum, m) => sum + m.attendanceRate, 0) / mentees.length),
    needsAttention: mentees.filter(m => m.attendanceRate < 75).length,
    excellentPerformers: mentees.filter(m => m.attendanceRate >= 90).length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Mentees</h1>
          <p className="text-muted-foreground">Manage and track your assigned mentees' progress and engagement.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMentees}</div>
              <p className="text-xs text-muted-foreground">Assigned to you</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageAttendance}%</div>
              <Progress value={stats.averageAttendance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Excellent Performers</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.excellentPerformers}</div>
              <p className="text-xs text-muted-foreground">90%+ attendance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.needsAttention}</div>
              <p className="text-xs text-muted-foreground">Below 75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Mentees Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mentee List</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentees..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button asChild variant="outline">
                  <Link to="/mentor/schedule">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Info</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Year & Department</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Last Meeting</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentees.map((mentee) => (
                  <TableRow key={mentee.id}>
                    <TableCell>
                      <div>
                        <Link 
                          to={`/mentor/student/${mentee.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {mentee.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{mentee.enrollmentNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-32">{mentee.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{mentee.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{mentee.year}</p>
                        <p className="text-sm text-muted-foreground">{mentee.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getAttendanceColor(mentee.attendanceRate)}`}>
                          {mentee.attendanceRate}%
                        </span>
                        <Progress value={mentee.attendanceRate} className="w-16 h-2" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {mentee.totalMeetings} total meetings
                      </p>
                    </TableCell>
                    <TableCell>{mentee.lastMeeting}</TableCell>
                    <TableCell>{getStatusBadge(mentee.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/mentor/student/${mentee.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyMentees;