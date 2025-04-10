
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/auth/LoginForm";
import { BookOpen, Users, FileText, Calendar } from "lucide-react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Header */}
      <header className="bg-vignan-blue text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">Vignan Mid Exam Central</h1>
          </div>
          <Button 
            onClick={() => setShowLogin(!showLogin)} 
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-vignan-blue"
          >
            {showLogin ? "Back to Home" : "Login"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showLogin ? (
          <div className="max-w-md mx-auto mt-8">
            <LoginForm />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="py-12 md:py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Manage Your Mid-Term Assessments
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                A centralized platform for students and faculty to streamline 
                the mid-term assessment process from T1 to T3.
              </p>
              <Button 
                onClick={() => setShowLogin(true)} 
                size="lg"
                className="bg-vignan-blue hover:bg-blue-800"
              >
                Get Started
              </Button>
            </section>

            {/* Features Section */}
            <section className="py-12 md:py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-vignan-blue/10 text-vignan-blue rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Group Management</h3>
                  <p className="text-gray-600">
                    Manage student groups with 4-5 members per group for collaborative work.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-vignan-blue/10 text-vignan-blue rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Assessment Tracking</h3>
                  <p className="text-gray-600">
                    Monitor T1, T2, and T3 assessments throughout the semester.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-vignan-blue/10 text-vignan-blue rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Deadline Management</h3>
                  <p className="text-gray-600">
                    Keep track of important dates and deadlines for all assessments.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="bg-vignan-blue/10 text-vignan-blue rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Submissions</h3>
                  <p className="text-gray-600">
                    Submit and download assignments, presentations, and IEEE papers.
                  </p>
                </div>
              </div>
            </section>

            {/* Workflow Section */}
            <section className="py-12 md:py-16 bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-center mb-8">Assessment Workflow</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border-r border-gray-200 pr-6 last:border-r-0">
                  <div className="bg-vignan-teal text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    T1
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Written Exam</h3>
                  <p className="text-gray-600">
                    Faculty assigns unique written questions to each group, 
                    visible on the student dashboard.
                  </p>
                </div>

                <div className="border-r border-gray-200 px-6 last:border-r-0">
                  <div className="bg-vignan-teal text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    T2
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Extension</h3>
                  <p className="text-gray-600">
                    Based on T1, students receive extension questions requiring 
                    deeper research and analytical thinking.
                  </p>
                </div>

                <div className="pl-6 last:border-r-0">
                  <div className="bg-vignan-teal text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mb-4">
                    T3
                  </div>
                  <h3 className="text-xl font-semibold mb-2">PPT & IEEE Paper</h3>
                  <p className="text-gray-600">
                    Students submit presentations and IEEE-format papers 
                    directly through the platform.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-vignan-blue text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Vignan University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
