
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  CreditCard, 
  BarChart4, 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Menu 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: Home,
  },
  {
    title: 'Members',
    href: '/admin/members',
    icon: Users,
  },
  {
    title: 'Recharge',
    href: '/admin/recharge',
    icon: CreditCard,
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: BarChart4,
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-muted/20">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-300 ease-in-out md:relative",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border/20">
          <div className={cn("flex items-center", !sidebarOpen && "md:justify-center")}>
            {sidebarOpen ? (
              <span className="text-xl font-bold">Cable Flow</span>
            ) : (
              <span className="text-xl font-bold md:block hidden">CF</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:flex hidden text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/20"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </Button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-md hover:bg-sidebar-accent/20 transition-colors",
                location.pathname === item.href && "bg-sidebar-accent/20 font-medium"
              )}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="ml-4 md:block">{item.title}</span>}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full flex items-center justify-start px-4 py-2 hover:bg-sidebar-accent/20 text-sidebar-foreground",
                  !sidebarOpen && "md:justify-center"
                )}
              >
                <User size={20} />
                {sidebarOpen && (
                  <div className="ml-4 text-left">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs opacity-70">{user?.email}</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        {/* Header */}
        <header className="bg-background border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </Button>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
