
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import AddMember from "./pages/admin/AddMember";
import MemberProfile from "./pages/admin/MemberProfile";
import Recharge from "./pages/admin/Recharge";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Member Pages
import MemberDashboard from "./pages/member/Dashboard";
import ViewPlan from "./pages/member/ViewPlan";
import Payments from "./pages/member/Payments";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Index />} />
      
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/members" element={<AdminRoute><Members /></AdminRoute>} />
      <Route path="/admin/members/add" element={<AdminRoute><AddMember /></AdminRoute>} />
      <Route path="/admin/members/:memberId" element={<AdminRoute><MemberProfile /></AdminRoute>} />
      <Route path="/admin/recharge" element={<AdminRoute><Recharge /></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><Reports /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      
      {/* Member routes */}
      <Route path="/member" element={<MemberRoute><MemberDashboard /></MemberRoute>} />
      <Route path="/member/plan" element={<MemberRoute><ViewPlan /></MemberRoute>} />
      <Route path="/member/payments" element={<MemberRoute><Payments /></MemberRoute>} />
      
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
