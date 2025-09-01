import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/Layout/Navbar";
import { toast } from "sonner";
import { FileText, Plus, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const mockUser = {
  name: "John Smith",
  role: "mentee" as const,
  avatar: ""
};

const mockComplaints = [
  {
    id: "1",
    title: "Lab Equipment Not Working",
    description: "The computers in Lab 301 are frequently crashing and affecting our practical sessions.",
    category: "infrastructure",
    status: "under_review",
    submittedAt: "2024-01-15T10:00:00Z",
    actions: [
      {
        id: "1",
        action: "Issue reported to IT department",
        takenBy: "Admin",
        takenAt: "2024-01-16T09:00:00Z",
        status: "in_progress"
      }
    ]
  },
  {
    id: "2",
    title: "Teaching Method Concern",
    description: "The current teaching approach in Advanced Mathematics is too fast-paced for most students to follow.",
    category: "teaching",
    status: "resolved",
    submittedAt: "2024-01-10T14:30:00Z",
    actions: [
      {
        id: "2",
        action: "Discussed with faculty head",
        takenBy: "Academic Dean",
        takenAt: "2024-01-12T11:00:00Z",
        status: "completed"
      },
      {
        id: "3",
        action: "Additional tutorial sessions arranged",
        takenBy: "Department Head",
        takenAt: "2024-01-14T16:00:00Z",
        status: "completed"
      }
    ]
  }
];

const ComplaintSystem = () => {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app this would call API
    toast.success("Complaint submitted successfully! You will receive updates on its progress.");
    setFormData({ title: '', description: '', category: '' });
    setIsSubmitDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Submitted
        </Badge>;
      case 'under_review':
        return <Badge variant="default" className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          Under Review
        </Badge>;
      case 'resolved':
        return <Badge className="bg-green-500 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Resolved
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'staff': return 'bg-blue-500';
      case 'teaching': return 'bg-purple-500';
      case 'infrastructure': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Complaint System</h1>
            <p className="text-muted-foreground">Submit anonymous complaints and track their progress.</p>
          </div>
          
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Submit Complaint
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit New Complaint</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff">Staff Related</SelectItem>
                      <SelectItem value="teaching">Teaching Method</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief title for your complaint"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the issue..."
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-accent/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="font-medium">Anonymous Submission</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your identity will remain completely confidential. Only the complaint details will be shared.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Submit Complaint</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsSubmitDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="my-complaints" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-complaints">My Complaints</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="my-complaints">
            <div className="space-y-6">
              {mockComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{complaint.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <Badge className={getCategoryColor(complaint.category)}>
                            {complaint.category}
                          </Badge>
                          <span>Submitted: {new Date(complaint.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {getStatusBadge(complaint.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{complaint.description}</p>
                    
                    {complaint.actions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Actions Taken:</h4>
                        <div className="space-y-2">
                          {complaint.actions.map((action) => (
                            <div key={action.id} className="flex items-start gap-3 p-3 bg-accent/30 rounded">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm">{action.action}</p>
                                <p className="text-xs text-muted-foreground">
                                  By {action.takenBy} on {new Date(action.takenAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {mockComplaints.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">No complaints submitted</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't submitted any complaints yet. If you have concerns, feel free to submit them.
                    </p>
                    <Button onClick={() => setIsSubmitDialogOpen(true)}>
                      Submit Your First Complaint
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="guidelines">
            <Card>
              <CardHeader>
                <CardTitle>Complaint Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What can you complaint about?</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Teaching methods and faculty concerns</li>
                    <li>Staff behavior and administrative issues</li>
                    <li>Infrastructure problems (labs, classrooms, facilities)</li>
                    <li>Academic policy concerns</li>
                    <li>Discrimination or harassment issues</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">How to write effective complaints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Be specific and provide clear details</li>
                    <li>Include dates, times, and locations when relevant</li>
                    <li>Focus on facts rather than emotions</li>
                    <li>Suggest potential solutions if possible</li>
                    <li>Be respectful and professional in your language</li>
                  </ul>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Privacy & Confidentiality
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    All complaints are submitted anonymously. Your identity will not be revealed to anyone. 
                    The college administration takes all complaints seriously and will investigate them fairly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintSystem;