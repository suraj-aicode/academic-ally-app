import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { Users, Clock, FileText, CheckCircle, XCircle, Mail } from "lucide-react";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mockMeeting = {
  id: "1",
  title: "Weekly Progress Review",
  date: "2024-01-15",
  startTime: "10:00",
  endTime: "11:00",
  attendees: [
    { id: "1", name: "John Smith", email: "john@example.com", present: true, reason: "" },
    { id: "2", name: "Emily Davis", email: "emily@example.com", present: true, reason: "" },
    { id: "3", name: "Michael Brown", email: "michael@example.com", present: false, reason: "" },
    { id: "4", name: "Sarah Wilson", email: "sarah@example.com", present: true, reason: "" },
    { id: "5", name: "David Lee", email: "david@example.com", present: false, reason: "" }
  ]
};

const AttendanceMarking = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState(mockMeeting.attendees);
  const [meetingInfo, setMeetingInfo] = useState({
    topic: "",
    actualStartTime: mockMeeting.startTime,
    actualEndTime: mockMeeting.endTime,
    issues: "",
    sendAbsentEmails: true
  });

  const handleAttendanceChange = (studentId: string, field: 'present' | 'reason', value: boolean | string) => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, [field]: value }
          : student
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const absentStudents = attendanceData.filter(student => !student.present);
    
    // Mock submission - in real app this would call API
    toast.success(`Attendance marked successfully! ${absentStudents.length > 0 && meetingInfo.sendAbsentEmails ? 'Absence notifications sent.' : ''}`);
    navigate('/mentor/dashboard');
  };

  const presentCount = attendanceData.filter(student => student.present).length;
  const absentCount = attendanceData.length - presentCount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mark Attendance</h1>
          <p className="text-muted-foreground">Record attendance for the completed meeting session.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Meeting Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium">Meeting Title</Label>
                    <p className="text-sm text-muted-foreground">{mockMeeting.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Date</Label>
                    <p className="text-sm text-muted-foreground">{mockMeeting.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="actualStartTime">Actual Start Time</Label>
                    <Input
                      id="actualStartTime"
                      type="time"
                      value={meetingInfo.actualStartTime}
                      onChange={(e) => setMeetingInfo(prev => ({ ...prev, actualStartTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="actualEndTime">Actual End Time</Label>
                    <Input
                      id="actualEndTime"
                      type="time"
                      value={meetingInfo.actualEndTime}
                      onChange={(e) => setMeetingInfo(prev => ({ ...prev, actualEndTime: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Attendance ({presentCount} Present, {absentCount} Absent)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    {attendanceData.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={student.id}
                            checked={student.present}
                            onCheckedChange={(checked) => 
                              handleAttendanceChange(student.id, 'present', checked as boolean)
                            }
                          />
                          <div>
                            <Label htmlFor={student.id} className="font-medium cursor-pointer">
                              {student.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {student.present ? (
                            <Badge variant="default" className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Present
                            </Badge>
                          ) : (
                            <>
                              <Badge variant="destructive" className="flex items-center gap-1">
                                <XCircle className="w-3 h-3" />
                                Absent
                              </Badge>
                              <Input
                                placeholder="Reason (optional)"
                                value={student.reason}
                                onChange={(e) => handleAttendanceChange(student.id, 'reason', e.target.value)}
                                className="w-40 h-8"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Meeting Topic/Summary</Label>
                      <Input
                        id="topic"
                        value={meetingInfo.topic}
                        onChange={(e) => setMeetingInfo(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="Brief summary of what was discussed..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issues">Issues/Concerns (if any)</Label>
                      <Textarea
                        id="issues"
                        value={meetingInfo.issues}
                        onChange={(e) => setMeetingInfo(prev => ({ ...prev, issues: e.target.value }))}
                        placeholder="Any issues or concerns that arose during the meeting..."
                        rows={3}
                      />
                    </div>

                    {absentCount > 0 && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sendAbsentEmails"
                          checked={meetingInfo.sendAbsentEmails}
                          onCheckedChange={(checked) => 
                            setMeetingInfo(prev => ({ ...prev, sendAbsentEmails: checked as boolean }))
                          }
                        />
                        <Label htmlFor="sendAbsentEmails" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send absence notification emails to absent students
                        </Label>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Submit Attendance
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/mentor/dashboard')}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Students:</span>
                    <span className="font-medium">{attendanceData.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present:</span>
                    <span className="font-medium text-green-600">{presentCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent:</span>
                    <span className="font-medium text-red-600">{absentCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Attendance Rate:</span>
                    <span className="font-medium">
                      {((presentCount / attendanceData.length) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {absentCount > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Absent Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {attendanceData
                      .filter(student => !student.present)
                      .map(student => (
                        <div key={student.id} className="text-sm">
                          <p className="font-medium">{student.name}</p>
                          {student.reason && (
                            <p className="text-muted-foreground text-xs">
                              Reason: {student.reason}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                  
                  {meetingInfo.sendAbsentEmails && (
                    <div className="mt-4 p-3 bg-accent/50 rounded">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">Email Notification</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Absent students will receive an email asking for absence reason.
                      </p>
                    </div>
                      )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMarking;