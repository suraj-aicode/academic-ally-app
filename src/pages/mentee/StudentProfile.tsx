import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { User, Phone, Mail, MapPin, Calendar, GraduationCap, DollarSign, BookOpen } from "lucide-react";

const mockUser = {
  name: "John Smith",
  role: "mentee" as const,
  avatar: ""
};

const mockStudentData = {
  personalInfo: {
    fullName: "John Smith",
    email: "john.smith@college.edu",
    contactNumber: "+1-234-567-8900",
    address: "123 College Street, University City, UC 12345",
    dateOfBirth: "2002-05-15",
    department: "Computer Science Engineering",
    yearOfAdmission: "2021",
    passOutYear: "2025"
  },
  family: {
    fatherName: "Robert Smith",
    fatherContact: "+1-234-567-8901",
    motherName: "Mary Smith",
    motherContact: "+1-234-567-8902"
  },
  academic: {
    overallAttendance: 85,
    currentSemester: 6,
    hobbies: ["Programming", "Reading", "Basketball", "Photography"]
  },
  fees: {
    totalFees: 50000,
    paidAmount: 35000,
    pendingAmount: 15000,
    lastPaymentDate: "2024-01-10"
  },
  results: [
    { semester: 1, marks: 85, grade: "A", year: "2021" },
    { semester: 2, marks: 88, grade: "A", year: "2021" },
    { semester: 3, marks: 82, grade: "A", year: "2022" },
    { semester: 4, marks: 90, grade: "A+", year: "2022" },
    { semester: 5, marks: 87, grade: "A", year: "2023" }
  ]
};

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(mockStudentData);

  const handleSave = () => {
    // Mock save - in real app this would call API
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-500";
      case "A": return "bg-blue-500";
      case "B+": return "bg-yellow-500";
      case "B": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Student Profile</h1>
            <p className="text-muted-foreground">Manage your personal and academic information.</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Contact Number</Label>
                    <Input
                      id="contactNumber"
                      value={formData.personalInfo.contactNumber}
                      onChange={(e) => handleInputChange('personalInfo', 'contactNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.personalInfo.address}
                      onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.personalInfo.dateOfBirth}
                        onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.personalInfo.department}
                        onChange={(e) => handleInputChange('personalInfo', 'department', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Family Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={formData.family.fatherName}
                      onChange={(e) => handleInputChange('family', 'fatherName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fatherContact">Father's Contact</Label>
                    <Input
                      id="fatherContact"
                      value={formData.family.fatherContact}
                      onChange={(e) => handleInputChange('family', 'fatherContact', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={formData.family.motherName}
                      onChange={(e) => handleInputChange('family', 'motherName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motherContact">Mother's Contact</Label>
                    <Input
                      id="motherContact"
                      value={formData.family.motherContact}
                      onChange={(e) => handleInputChange('family', 'motherContact', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Hobbies</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.academic.hobbies.map((hobby, index) => (
                        <Badge key={index} variant="secondary">
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formData.academic.currentSemester}</div>
                    <p className="text-sm text-muted-foreground">Current Semester</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">{formData.academic.overallAttendance}%</div>
                    <p className="text-sm text-muted-foreground">Overall Attendance</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formData.personalInfo.yearOfAdmission} - {formData.personalInfo.passOutYear}
                    </div>
                    <p className="text-sm text-muted-foreground">Study Period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Fee Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">${formData.fees.totalFees.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Total Fees</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${formData.fees.paidAmount.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Paid Amount</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">${formData.fees.pendingAmount.toLocaleString()}</div>
                    <p className="text-sm text-muted-foreground">Pending Amount</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-accent/50 rounded-lg">
                  <p className="text-sm">
                    <strong>Last Payment:</strong> {formData.fees.lastPaymentDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Semester Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.results.map((result) => (
                    <div key={result.semester} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Semester {result.semester}</h4>
                        <Badge className={getGradeColor(result.grade)}>
                          {result.grade}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-primary">{result.marks}%</p>
                      <p className="text-sm text-muted-foreground">Academic Year {result.year}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary">
                        {(formData.results.reduce((acc, curr) => acc + curr.marks, 0) / formData.results.length).toFixed(1)}%
                      </div>
                      <p className="text-sm text-muted-foreground">Average Marks</p>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{formData.results.length}</div>
                      <p className="text-sm text-muted-foreground">Completed Semesters</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentProfile;