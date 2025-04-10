
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, BookOpen, FileText, LogOut, 
  BarChart4, Settings, Home 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const AdminLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated and has admin role
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated || userRole !== "admin") {
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-vignan-blue text-white w-full md:w-64 md:min-h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center">
            <BookOpen className="mr-2" /> Vignan Exams
          </h1>
        </div>
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin/dashboard" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Home className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/classes" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <BookOpen className="mr-3" /> Classes
              </Link>
            </li>
            <li>
              <Link to="/admin/groups" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Users className="mr-3" /> Groups
              </Link>
            </li>
            <li>
              <Link to="/admin/assessments" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <FileText className="mr-3" /> Assessments
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <BarChart4 className="mr-3" /> Reports
              </Link>
            </li>
            <li>
              <Link to="/admin/settings" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Settings className="mr-3" /> Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-blue-800">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-blue-800 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-vignan-lightgray">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
