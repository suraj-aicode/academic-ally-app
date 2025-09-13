import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Users, FileText, Settings, LogOut, Home, User } from "lucide-react";

interface NavbarProps {
  user?: {
    name: string;
    role: 'mentor' | 'mentee' | 'admin';
    avatar?: string;
  };
}

export const Navbar = ({ user }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout - in real app this would clear auth state
    navigate('/auth');
  };

  const navItems = user?.role === 'mentor' ? [
    { icon: Home, label: "Dashboard", path: "/mentor/dashboard" },
    { icon: Calendar, label: "Schedule", path: "/mentor/schedule" },
    { icon: Users, label: "Mentees", path: "/mentor/mentees" },
    { icon: FileText, label: "Complaints", path: "/mentor/complaints" },
  ] : user?.role === 'admin' ? [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ] : [
    { icon: Home, label: "Dashboard", path: "/mentee/dashboard" },
    { icon: Calendar, label: "Meetings", path: "/mentee/meetings" },
    { icon: User, label: "Profile", path: "/mentee/profile" },
    { icon: FileText, label: "Complaints", path: "/mentee/complaints" },
  ];

  if (!user) {
    return (
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            MentorMeet
          </Link>
          <Button asChild>
            <Link to="/auth">Login</Link>
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          MentorMeet
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="flex flex-col items-start">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground capitalize">{user.role}</div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};