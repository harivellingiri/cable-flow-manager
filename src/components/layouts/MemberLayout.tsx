
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Bell, Menu, X, Home, CreditCard, FileText } from 'lucide-react';
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
    href: '/member',
    icon: Home,
  },
  {
    title: 'View Plan',
    href: '/member/plan',
    icon: FileText,
  },
  {
    title: 'Payments',
    href: '/member/payments',
    icon: CreditCard,
  },
];

interface MemberLayoutProps {
  children: React.ReactNode;
}

const MemberLayout: React.FC<MemberLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-10">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/member" className="text-xl font-bold">Cable Flow</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary/90"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-primary-foreground/90 hover:text-primary-foreground transition-colors",
                  location.pathname === item.href && "font-medium text-primary-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
                <Bell size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground font-medium">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-16 z-50 bg-background border-b border-border shadow-lg transition-all duration-300 transform",
        mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="p-4 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href} 
              className="flex items-center px-4 py-2 rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.title}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 rounded-md hover:bg-muted text-left"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="container mx-auto p-4 md:p-6 h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Cable Flow Management System
        </div>
      </footer>
    </div>
  );
};

export default MemberLayout;
