import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GraduationCap,
  User,
  ChevronDown,
  Calendar,
  Users,
  Home,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const { user, switchRole } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/alumni", label: "Alumni Directory", icon: Users },
    { path: "/events", label: "Events", icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              AlumniConnect
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-base",
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <UserCircle className="h-4 w-4" />
                <span className="hidden sm:inline">{user?.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                  {user?.role?.toUpperCase()}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => switchRole('student')}>
                <User className="mr-2 h-4 w-4" />
                Student View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('alumni')}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Alumni View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchRole('admin')}>
                <UserCircle className="mr-2 h-4 w-4" />
                Admin View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
