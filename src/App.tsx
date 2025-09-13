import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MenteeDashboard from "./pages/mentee/MenteeDashboard";
import ScheduleMeeting from "./pages/mentor/ScheduleMeeting";
import StudentProfile from "./pages/mentee/StudentProfile";
import ComplaintSystem from "./pages/mentee/ComplaintSystem";
import AttendanceMarking from "./pages/mentor/AttendanceMarking";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AttendanceAnalytics from "./pages/mentor/AttendanceAnalytics";
import QRAttendance from "./pages/mentor/QRAttendance";
import MeetingMinutes from "./pages/mentor/MeetingMinutes";
import MyMentees from "./pages/mentor/MyMentees";
import StudentDetails from "./pages/mentor/StudentDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          <Route path="/mentor/schedule" element={<ScheduleMeeting />} />
          <Route path="/mentor/attendance" element={<AttendanceMarking />} />
          <Route path="/mentor/analytics" element={<AttendanceAnalytics />} />
          <Route path="/mentor/qr-attendance" element={<QRAttendance />} />
          <Route path="/mentor/minutes" element={<MeetingMinutes />} />
          <Route path="/mentor/mentees" element={<MyMentees />} />
          <Route path="/mentor/student/:studentId" element={<StudentDetails />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
          <Route path="/mentee/profile" element={<StudentProfile />} />
          <Route path="/mentee/complaints" element={<ComplaintSystem />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
