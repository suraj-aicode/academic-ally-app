import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Layout/Navbar";
import { Calendar, User, FileText, Clock, GraduationCap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const mockUser = {
  name: "John Smith",
  role: "mentee" as const,
  avatar: ""
};

const mockStats = {
  totalMeetings: 28,
  attendedMeetings: 24,
  upcomingMeetings: 2,
  attendanceRate: 86,
  mentor: "Dr. Sarah Johnson"
};

const upcomingMeetings = [
  {
    id: "1",
    title: "Career Guidance Session",
    date: "2024-01-18",
    time: "2:00 PM",
    mentor: "Dr. Sarah Johnson",
    status: "scheduled" as const
  },
  {
    id: "2",
    title: "Project Discussion",
    date: "2024-01-20",
    time: "11:00 AM",
    mentor: "Dr. Sarah Johnson",
    status: "scheduled" as const
  }
];

const recentActivity = [
  {
    type: "meeting",
    title: "Weekly Progress Review",
    date: "2024-01-15",
    status: "attended"
  },
  {
    type: "complaint",
    title: "Lab Equipment Issue",
    date: "2024-01-12",
    status: "resolved"
  },
  {
    type: "profile",
    title: "Updated contact information",
    date: "2024-01-10",
    status: "completed"
  }
];

const MenteeDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {mockUser.name}</h1>
          <p className="text-muted-foreground">Stay updated with your mentoring sessions and academic progress.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMeetings}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.attendanceRate}%</div>
              <Progress value={mockStats.attendanceRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.upcomingMeetings}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentor</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{mockStats.mentor}</div>
              <p className="text-xs text-muted-foreground">Assigned mentor</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Meetings</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link to="/mentee/meetings">
                    <Calendar className="w-4 h-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
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
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">with {meeting.mentor}</p>
                    </div>
                    <Badge variant="secondary">
                      {meeting.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button asChild className="w-full justify-start">
                    <Link to="/mentee/profile">
                      <User className="w-4 h-4 mr-3" />
                      Update Profile
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/mentee/complaints">
                      <FileText className="w-4 h-4 mr-3" />
                      Submit Complaint
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/mentee/meetings">
                      <Calendar className="w-4 h-4 mr-3" />
                      View Schedule
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;