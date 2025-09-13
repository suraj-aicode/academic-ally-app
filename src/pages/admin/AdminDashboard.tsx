import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navbar } from "@/components/Layout/Navbar";
import { Users, UserPlus, Settings, Shield, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const mockAdmin = {
  name: "Admin User",
  role: "admin" as const,
  avatar: ""
};

const mockStats = {
  totalMentors: 25,
  totalMentees: 150,
  activeMentorships: 140,
  pendingAssignments: 10
};

const mockMentors = [
  { id: "1", name: "Dr. Sarah Johnson", department: "Computer Science", mentees: 12, email: "sarah.j@edu.com" },
  { id: "2", name: "Prof. Mike Chen", department: "Engineering", mentees: 8, email: "mike.c@edu.com" },
  { id: "3", name: "Dr. Lisa Wang", department: "Mathematics", mentees: 15, email: "lisa.w@edu.com" }
];

const mockMentees = [
  { id: "1", name: "John Smith", department: "Computer Science", mentor: "Dr. Sarah Johnson", year: "3rd Year" },
  { id: "2", name: "Emma Davis", department: "Engineering", mentor: "Prof. Mike Chen", year: "2nd Year" },
  { id: "3", name: "Alex Johnson", department: "Mathematics", mentor: "Unassigned", year: "1st Year" }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockAdmin} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage mentors, mentees, and system assignments.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMentors}</div>
              <p className="text-xs text-muted-foreground">Active faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentees</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalMentees}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Mentorships</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeMentorships}</div>
              <p className="text-xs text-muted-foreground">Current assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockStats.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mentors Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mentors Management</CardTitle>
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Mentor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search mentors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Mentees</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMentors.map((mentor) => (
                      <TableRow key={mentor.id}>
                        <TableCell className="font-medium">{mentor.name}</TableCell>
                        <TableCell>{mentor.department}</TableCell>
                        <TableCell>{mentor.mentees}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Mentees Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Mentees Management</CardTitle>
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Mentee
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Mentor</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMentees.map((mentee) => (
                      <TableRow key={mentee.id}>
                        <TableCell className="font-medium">{mentee.name}</TableCell>
                        <TableCell>{mentee.year}</TableCell>
                        <TableCell>
                          <Badge variant={mentee.mentor === "Unassigned" ? "destructive" : "default"}>
                            {mentee.mentor}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="w-full justify-start" size="lg">
                <Link to="/admin/assignments">
                  <Settings className="w-5 h-5 mr-3" />
                  Bulk Assignments
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link to="/admin/reports">
                  <Shield className="w-5 h-5 mr-3" />
                  System Reports
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start" size="lg">
                <Link to="/admin/settings">
                  <Users className="w-5 h-5 mr-3" />
                  System Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;