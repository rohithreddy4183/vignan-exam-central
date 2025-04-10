
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Upload, CheckCircle, AlertCircle, BookOpen, User } from "lucide-react";

const AdminDashboard = () => {
  // Mock data - in a real app, this would come from your API
  const stats = {
    totalClasses: 6,
    totalGroups: 24,
    totalStudents: 112,
    pendingAssessments: 8,
    submittedAssessments: 14,
    pendingReviews: 10,
  };
  
  const recentSubmissions = [
    { id: 1, group: "Group A-3", subject: "Web Technologies", type: "T3", date: "2023-10-15", status: "pending" },
    { id: 2, group: "Group B-2", subject: "Data Science", type: "T3", date: "2023-10-14", status: "reviewed" },
    { id: 3, group: "Group C-4", subject: "Computer Networks", type: "T2", date: "2023-10-13", status: "pending" },
    { id: 4, group: "Group A-1", subject: "Web Technologies", type: "T3", date: "2023-10-12", status: "reviewed" },
  ];

  const upcomingDeadlines = [
    { id: 1, subject: "Web Technologies", assessmentType: "T3", deadline: "2023-10-20", class: "CSE-A" },
    { id: 2, subject: "Data Science", assessmentType: "T2", deadline: "2023-10-22", class: "CSE-B" },
    { id: 3, subject: "Computer Networks", assessmentType: "T3", deadline: "2023-10-25", class: "CSE-C" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to Vignan's Mid Exam Evaluation System
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              Active classes this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGroups}</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Total enrolled students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting submission
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submittedAssessments}</div>
            <p className="text-xs text-muted-foreground">
              Submissions received
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting your review
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Submissions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>
              Latest student group submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map(submission => (
                <div key={submission.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{submission.group}</p>
                    <p className="text-sm text-muted-foreground">
                      {submission.subject} ({submission.type})
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm mr-2">{submission.date}</p>
                    {submission.status === "pending" ? (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Deadlines */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Assessment deadlines for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{deadline.subject} ({deadline.assessmentType})</p>
                    <p className="text-sm text-muted-foreground">
                      {deadline.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm bg-vignan-teal/10 text-vignan-teal px-2 py-1 rounded">
                      {deadline.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
