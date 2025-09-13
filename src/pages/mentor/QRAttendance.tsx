import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { QrCode, Clock, Users, RefreshCw, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mockMeeting = {
  id: "meeting-123",
  title: "Weekly Progress Review",
  date: "2024-01-18",
  time: "2:00 PM",
  duration: "60 minutes",
  expectedAttendees: 12
};

const QRAttendance = () => {
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [attendanceList, setAttendanceList] = useState<Array<{
    id: string;
    name: string;
    timestamp: string;
    status: 'present';
  }>>([]);

  const generateQRCode = async () => {
    const attendanceData = {
      meetingId: mockMeeting.id,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
    };

    const qrString = JSON.stringify(attendanceData);
    const qrDataURL = await QRCode.toDataURL(qrString, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    setQrCodeData(qrDataURL);
    setIsActive(true);
    setTimeRemaining(300); // Reset to 5 minutes

    // Simulate some students scanning the QR code
    setTimeout(() => {
      setAttendanceList(prev => [...prev, {
        id: "1",
        name: "John Smith",
        timestamp: new Date().toLocaleTimeString(),
        status: 'present'
      }]);
    }, 2000);

    setTimeout(() => {
      setAttendanceList(prev => [...prev, {
        id: "2",
        name: "Emma Davis",
        timestamp: new Date().toLocaleTimeString(),
        status: 'present'
      }]);
    }, 4000);

    setTimeout(() => {
      setAttendanceList(prev => [...prev, {
        id: "3",
        name: "Alex Johnson",
        timestamp: new Date().toLocaleTimeString(),
        status: 'present'
      }]);
    }, 6000);
  };

  const stopQRSession = () => {
    setIsActive(false);
    setTimeRemaining(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">QR Code Attendance</h1>
          <p className="text-muted-foreground">Generate QR codes for quick and contactless attendance marking.</p>
        </div>

        {/* Meeting Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Meeting Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Meeting Title</h4>
                <p className="text-lg font-semibold">{mockMeeting.title}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Date & Time</h4>
                <p className="text-lg font-semibold">{mockMeeting.date} at {mockMeeting.time}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Duration</h4>
                <p className="text-lg font-semibold">{mockMeeting.duration}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Expected Attendees</h4>
                <p className="text-lg font-semibold">{mockMeeting.expectedAttendees} students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isActive ? (
                <div className="text-center space-y-4">
                  <div className="w-64 h-64 mx-auto border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Click to generate QR code</p>
                    </div>
                  </div>
                  <Button onClick={generateQRCode} size="lg" className="w-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <img 
                      src={qrCodeData} 
                      alt="QR Code for attendance" 
                      className="w-64 h-64 mx-auto border rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={timeRemaining > 60 ? "default" : "destructive"}>
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(timeRemaining)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Students can scan this QR code to mark their attendance
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={generateQRCode} variant="outline" className="flex-1">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button onClick={stopQRSession} variant="destructive" className="flex-1">
                        <X className="w-4 h-4 mr-2" />
                        Stop Session
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Live Attendance */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Live Attendance
                </CardTitle>
                <Badge variant="outline">
                  {attendanceList.length}/{mockMeeting.expectedAttendees}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceList.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {isActive ? "Waiting for students to scan..." : "No attendance records yet"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {attendanceList.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">Scanned at {student.timestamp}</p>
                          </div>
                        </div>
                        <Badge variant="default">Present</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use QR Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h4 className="font-medium mb-2">Generate QR Code</h4>
                <p className="text-sm text-muted-foreground">Click the generate button to create a time-limited QR code for your meeting.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h4 className="font-medium mb-2">Share with Students</h4>
                <p className="text-sm text-muted-foreground">Display the QR code on screen or share it with students via projection.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-medium mb-2">Track Attendance</h4>
                <p className="text-sm text-muted-foreground">Monitor real-time attendance as students scan the QR code with their phones.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRAttendance;