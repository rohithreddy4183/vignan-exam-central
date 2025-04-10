
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, BookOpen, FileText, LogOut, 
  Upload, User, Home 
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const StudentLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated and has student role
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    
    if (!isAuthenticated || userRole !== "student") {
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const studentName = "John Doe"; // In real app, get from state/context
  const regNumber = "21BCE7777"; // In real app, get from state/context

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-vignan-blue text-white w-full md:w-64 md:min-h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center">
            <BookOpen className="mr-2" /> Vignan Exams
          </h1>
        </div>
        
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center mb-2">
            <User className="mr-2" />
            <span>{studentName}</span>
          </div>
          <div className="text-sm opacity-75">
            Reg: {regNumber}
          </div>
        </div>
        
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link to="/student/dashboard" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Home className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/student/assignments" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <FileText className="mr-3" /> Assignments
              </Link>
            </li>
            <li>
              <Link to="/student/group" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Users className="mr-3" /> My Group
              </Link>
            </li>
            <li>
              <Link to="/student/submissions" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <Upload className="mr-3" /> Submissions
              </Link>
            </li>
            <li>
              <Link to="/student/profile" className="flex items-center p-2 rounded-lg hover:bg-blue-800 transition-colors">
                <User className="mr-3" /> Profile
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

export default StudentLayout;
