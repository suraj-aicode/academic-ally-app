import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { Calendar, Users, FileText, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mockStats = {
  totalMentees: 12,
  scheduledMeetings: 3,
  completedMeetings: 28,
  pendingComplaints: 2,
  averageAttendance: 85
};

const recentMeetings = [
  {
    id: "1",
    title: "Weekly Progress Review",
    date: "2024-01-15",
    time: "10:00 AM",
    attendees: 8,
    status: "completed" as const
  },
  {
    id: "2",
    title: "Career Guidance Session",
    date: "2024-01-18",
    time: "2:00 PM",
    attendees: 12,
    status: "scheduled" as const
  },
  {
    id: "3",
    title: "Project Discussion",
    date: "2024-01-20",
    time: "11:00 AM",
    attendees: 5,
    status: "scheduled" as const
  }
];

const MentorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your mentees today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMentees}</div>
              <p className="text-xs text-muted-foreground">Active assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.scheduledMeetings}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Meetings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.completedMeetings}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">Overall rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Meetings</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link to="/mentor/schedule">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {meeting.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {meeting.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {meeting.attendees} attendees
                        </span>
                      </div>
                    </div>
                    <Badge variant={meeting.status === 'completed' ? 'default' : 'secondary'}>
                      {meeting.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button asChild className="w-full justify-start" size="lg">
                  <Link to="/mentor/schedule">
                    <Calendar className="w-5 h-5 mr-3" />
                    Schedule Meeting
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start" size="lg">
                  <Link to="/mentor/attendance">
                    <FileText className="w-5 h-5 mr-3" />
                    Mark Attendance
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start" size="lg">
                  <Link to="/mentor/mentees">
                    <Users className="w-5 h-5 mr-3" />
                    View Mentees
                  </Link>
                </Button>
                
                {mockStats.pendingComplaints > 0 && (
                  <Button asChild variant="outline" className="w-full justify-start" size="lg">
                    <Link to="/mentor/complaints">
                      <AlertCircle className="w-5 h-5 mr-3" />
                      Review Complaints ({mockStats.pendingComplaints})
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;