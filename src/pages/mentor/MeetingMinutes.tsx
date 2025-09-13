import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Layout/Navbar";
import { FileText, Plus, Save, Edit, Trash2, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  attendees: 12
};

const existingMinutes = [
  {
    id: "1",
    meetingId: "meeting-120",
    meetingTitle: "Project Planning Session",
    content: "Discussed project timelines and resource allocation. Students presented their initial proposals.",
    actionItems: [
      "Complete literature review by next week",
      "Prepare prototype demo for next meeting",
      "Submit project proposal draft"
    ],
    decisions: [
      "Approved project timeline extension",
      "Selected Python as primary development language"
    ],
    createdAt: "2024-01-15",
    createdBy: "Dr. Sarah Johnson"
  },
  {
    id: "2",
    meetingId: "meeting-121",
    meetingTitle: "Career Guidance Session",
    content: "Discussed career opportunities in technology sector. Students shared their aspirations and concerns.",
    actionItems: [
      "Research internship opportunities",
      "Update LinkedIn profiles",
      "Prepare for upcoming job fair"
    ],
    decisions: [
      "Schedule individual career counseling sessions",
      "Organize industry expert guest lecture"
    ],
    createdAt: "2024-01-12",
    createdBy: "Dr. Sarah Johnson"
  }
];

const MeetingMinutes = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    content: "",
    actionItems: [""],
    decisions: [""]
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Meeting Minutes Saved",
      description: "The meeting minutes have been successfully saved.",
    });
    setIsCreating(false);
    setEditingId(null);
    setFormData({ content: "", actionItems: [""], decisions: [""] });
  };

  const addActionItem = () => {
    setFormData(prev => ({
      ...prev,
      actionItems: [...prev.actionItems, ""]
    }));
  };

  const addDecision = () => {
    setFormData(prev => ({
      ...prev,
      decisions: [...prev.decisions, ""]
    }));
  };

  const updateActionItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      actionItems: prev.actionItems.map((item, i) => i === index ? value : item)
    }));
  };

  const updateDecision = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      decisions: prev.decisions.map((item, i) => i === index ? value : item)
    }));
  };

  const removeActionItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actionItems: prev.actionItems.filter((_, i) => i !== index)
    }));
  };

  const removeDecision = (index: number) => {
    setFormData(prev => ({
      ...prev,
      decisions: prev.decisions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meeting Minutes</h1>
          <p className="text-muted-foreground">Create and manage detailed meeting minutes with action items and decisions.</p>
        </div>

        {/* Current Meeting Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Meeting</CardTitle>
              <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
                <Plus className="w-4 h-4 mr-2" />
                Create Minutes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{mockMeeting.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{mockMeeting.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{mockMeeting.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create/Edit Minutes Form */}
        {(isCreating || editingId) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {isCreating ? "Create Meeting Minutes" : "Edit Meeting Minutes"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content */}
              <div>
                <label className="text-sm font-medium mb-2 block">Meeting Summary</label>
                <Textarea
                  placeholder="Describe what was discussed in the meeting..."
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-32"
                />
              </div>

              {/* Action Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Action Items</label>
                  <Button onClick={addActionItem} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.actionItems.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter action item..."
                        value={item}
                        onChange={(e) => updateActionItem(index, e.target.value)}
                      />
                      {formData.actionItems.length > 1 && (
                        <Button 
                          onClick={() => removeActionItem(index)} 
                          variant="outline" 
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decisions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Key Decisions</label>
                  <Button onClick={addDecision} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Decision
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.decisions.map((decision, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Enter key decision..."
                        value={decision}
                        onChange={(e) => updateDecision(index, e.target.value)}
                      />
                      {formData.decisions.length > 1 && (
                        <Button 
                          onClick={() => removeDecision(index)} 
                          variant="outline" 
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Minutes
                </Button>
                <Button 
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({ content: "", actionItems: [""], decisions: [""] });
                  }} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Previous Minutes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Previous Meeting Minutes</h2>
          {existingMinutes.map((minutes) => (
            <Card key={minutes.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{minutes.meetingTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Created on {minutes.createdAt} by {minutes.createdBy}
                    </p>
                  </div>
                  <Button 
                    onClick={() => setEditingId(minutes.id)} 
                    variant="outline" 
                    size="sm"
                    disabled={isCreating || editingId !== null}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Meeting Summary</h4>
                  <p className="text-muted-foreground">{minutes.content}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Action Items</h4>
                  <ul className="space-y-1">
                    {minutes.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Decisions</h4>
                  <div className="flex flex-wrap gap-2">
                    {minutes.decisions.map((decision, index) => (
                      <Badge key={index} variant="secondary">
                        {decision}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingMinutes;