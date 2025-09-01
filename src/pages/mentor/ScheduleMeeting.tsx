import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { Calendar, Clock, Users, Mail } from "lucide-react";

const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "mentor" as const,
  avatar: ""
};

const mockMentees = [
  { id: "1", name: "John Smith", email: "john@example.com" },
  { id: "2", name: "Emily Davis", email: "emily@example.com" },
  { id: "3", name: "Michael Brown", email: "michael@example.com" },
  { id: "4", name: "Sarah Wilson", email: "sarah@example.com" },
  { id: "5", name: "David Lee", email: "david@example.com" }
];

const ScheduleMeeting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    selectedMentees: [] as string[],
    sendEmail: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.selectedMentees.length === 0) {
      toast.error("Please select at least one mentee");
      return;
    }

    // Mock scheduling - in real app this would call API
    toast.success("Meeting scheduled successfully! Email notifications sent.");
    navigate('/mentor/dashboard');
  };

  const handleMenteeToggle = (menteeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedMentees: prev.selectedMentees.includes(menteeId)
        ? prev.selectedMentees.filter(id => id !== menteeId)
        : [...prev.selectedMentees, menteeId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Meeting</h1>
          <p className="text-muted-foreground">Create a new mentoring session for your mentees.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Meeting Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Meeting Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Weekly Progress Review"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the meeting agenda..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sendEmail"
                      checked={formData.sendEmail}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, sendEmail: checked as boolean }))
                      }
                    />
                    <Label htmlFor="sendEmail" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Send email notifications to selected mentees
                    </Label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Schedule Meeting
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

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Select Mentees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMentees.map((mentee) => (
                    <div key={mentee.id} className="flex items-center space-x-2 p-2 border rounded">
                      <Checkbox
                        id={mentee.id}
                        checked={formData.selectedMentees.includes(mentee.id)}
                        onCheckedChange={() => handleMenteeToggle(mentee.id)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={mentee.id} className="font-medium cursor-pointer">
                          {mentee.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">{mentee.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-accent/50 rounded">
                  <p className="text-sm font-medium">
                    Selected: {formData.selectedMentees.length} of {mockMentees.length} mentees
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;