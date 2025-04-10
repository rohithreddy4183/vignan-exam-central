
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Upload, CheckCircle, AlertCircle, Clock, Users, Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  // Mock student data - in a real app, this would come from your API or context
  const student = {
    name: "John Doe",
    regNumber: "21BCE7777",
    class: "CSE-A",
    group: "Group A-3",
    groupMembers: [
      "John Doe (21BCE7777)",
      "Jane Smith (21BCE7778)",
      "Robert Johnson (21BCE7779)",
      "Emily Davis (21BCE7780)"
    ]
  };
  
  // Mock assessments data
  const assessments = [
    {
      id: 1,
      type: "T1",
      title: "Implement a responsive web application using React",
      subject: "Web Technologies",
      deadline: "2023-10-15",
      status: "completed",
      submissionDate: "2023-10-10"
    },
    {
      id: 2,
      type: "T2",
      title: "Add user authentication and database integration to your web app",
      subject: "Web Technologies",
      deadline: "2023-10-25",
      status: "in-progress",
      submissionDate: null
    },
    {
      id: 3,
      type: "T3",
      title: "Create a presentation and IEEE paper on your web application",
      subject: "Web Technologies",
      deadline: "2023-11-05",
      status: "upcoming",
      submissionDate: null
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {student.name}
        </p>
      </div>

      {/* Student Info */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>My Information</CardTitle>
            <CardDescription>Your academic details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                <p>{student.regNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Class</p>
                <p>{student.class}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Group</p>
                <p>{student.group}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>My Group</CardTitle>
            <CardDescription>Group members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {student.groupMembers.map((member, index) => (
                <div key={index} className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p className="text-sm">{member}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Assessments */}
      <h2 className="text-xl font-bold mt-6">My Assessments</h2>
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <span className="bg-vignan-blue text-white text-xs px-2 py-1 rounded mr-2">
                      {assessment.type}
                    </span>
                    {assessment.subject}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {assessment.title}
                  </CardDescription>
                </div>
                <div>
                  {assessment.status === "completed" && (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      <CheckCircle className="h-3 w-3 mr-1" /> Completed
                    </span>
                  )}
                  {assessment.status === "in-progress" && (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      <Clock className="h-3 w-3 mr-1" /> In Progress
                    </span>
                  )}
                  {assessment.status === "upcoming" && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      <AlertCircle className="h-3 w-3 mr-1" /> Upcoming
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm font-medium">Deadline</p>
                  <p className="text-sm text-muted-foreground">{assessment.deadline}</p>
                </div>
                {assessment.status === "completed" ? (
                  <div className="flex space-x-2">
                    <p className="text-sm text-muted-foreground">
                      Submitted on {assessment.submissionDate}
                    </p>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-3 w-3 mr-1" /> Download
                    </Button>
                  </div>
                ) : assessment.status === "in-progress" ? (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button size="sm" className="h-8" onClick={() => navigate("/student/assignments/" + assessment.id)}>
                      <FileText className="h-3 w-3 mr-1" /> View Details
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => navigate("/student/submissions/new")}>
                      <Upload className="h-3 w-3 mr-1" /> Submit Work
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" className="h-8" onClick={() => navigate("/student/assignments/" + assessment.id)}>
                    <FileText className="h-3 w-3 mr-1" /> View Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
