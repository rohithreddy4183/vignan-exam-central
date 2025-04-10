
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import StudentLayout from "./components/layouts/StudentLayout";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import GroupManagement from "./pages/admin/GroupManagement";
import ReportsPage from "./pages/admin/ReportsPage";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import AssessmentDetails from "./pages/student/AssessmentDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="groups" element={<GroupManagement />} />
              <Route path="reports" element={<ReportsPage />} />
              {/* Add other admin routes as needed */}
              <Route path="classes" element={<div className="p-4">Classes page coming soon</div>} />
              <Route path="assessments" element={<div className="p-4">Assessments page coming soon</div>} />
              <Route path="settings" element={<div className="p-4">Settings page coming soon</div>} />
            </Route>

            {/* Student Routes */}
            <Route path="/student" element={<StudentLayout />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="assignments/:id" element={<AssessmentDetails />} />
              {/* Add other student routes as needed */}
              <Route path="assignments" element={<div className="p-4">All assignments page coming soon</div>} />
              <Route path="group" element={<div className="p-4">My group page coming soon</div>} />
              <Route path="submissions" element={<div className="p-4">Submissions page coming soon</div>} />
              <Route path="submissions/new" element={<div className="p-4">New submission page coming soon</div>} />
              <Route path="profile" element={<div className="p-4">Profile page coming soon</div>} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
