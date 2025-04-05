
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import MemberProfile from "./pages/admin/MemberProfile";

// Member Pages
import MemberDashboard from "./pages/member/Dashboard";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import MemberLayout from "./components/layouts/MemberLayout";

const queryClient = new QueryClient();

// Protected route component for admin routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/member" />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

// Protected route component for member routes
const MemberRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isMember } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isMember) {
    return <Navigate to="/admin" />;
  }
  
  return <MemberLayout>{children}</MemberLayout>;
};

// Authentication check for root route
const RootRedirect = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/member" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />
      
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/members" element={<AdminRoute><Members /></AdminRoute>} />
      <Route path="/admin/members/:memberId" element={<AdminRoute><MemberProfile /></AdminRoute>} />
      
      {/* Member routes */}
      <Route path="/member" element={<MemberRoute><MemberDashboard /></MemberRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
