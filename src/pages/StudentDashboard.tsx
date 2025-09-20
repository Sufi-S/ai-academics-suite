import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Code, 
  Target,
  ArrowRight,
  Play,
  Users,
  FileText,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Quizzes Completed",
      value: "24",
      icon: <Trophy className="w-5 h-5" />,
      trend: { value: "+3 this week", isPositive: true }
    },
    {
      title: "Study Streak",
      value: "7 days",
      icon: <Target className="w-5 h-5" />,
      trend: { value: "Personal best!", isPositive: true }
    },
    {
      title: "Notes Created",
      value: "156",
      icon: <FileText className="w-5 h-5" />,
      trend: { value: "+12 today", isPositive: true }
    },
    {
      title: "AI Suggestions",
      value: "89",
      icon: <Brain className="w-5 h-5" />,
      trend: { value: "Helping you learn", isPositive: true }
    }
  ];

  const recentQuizzes = [
    { title: "JavaScript Fundamentals", score: 85, subject: "Programming" },
    { title: "Data Structures", score: 92, subject: "Computer Science" },
    { title: "React Components", score: 78, subject: "Web Development" }
  ];

  const aiSuggestions = [
    "Practice more on Array methods in JavaScript",
    "Review Binary Search Tree concepts",
    "Complete the React Hooks quiz for better understanding"
  ];

  const upcomingEvents = [
    { title: "Database Systems Quiz", time: "2:00 PM", date: "Today" },
    { title: "Group Study Session", time: "4:30 PM", date: "Tomorrow" },
    { title: "Algorithm Contest", time: "10:00 AM", date: "Friday" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
                ← Back to Home
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Welcome back,</span>
              <span className="font-semibold text-foreground">Alex Johnson</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Learning Assistant */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Learning Assistant</span>
                  <div className="animate-pulse-glow w-2 h-2 bg-edu-success rounded-full ml-2" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Today's AI Recommendations</h4>
                  <ul className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Play className="w-4 h-4 mr-2" />
                    Start AI Quiz
                  </Button>
                  <Button variant="outline">
                    Generate Flashcards
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Quizzes */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-edu-warning" />
                  <span>Recent Quiz Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/50">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{quiz.title}</h4>
                        <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${quiz.score >= 80 ? 'text-edu-success' : quiz.score >= 60 ? 'text-edu-warning' : 'text-destructive'}`}>
                          {quiz.score}%
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Review <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: BookOpen, title: "Take Quiz", color: "text-edu-primary" },
                    { icon: FileText, title: "My Notes", color: "text-edu-secondary" },
                    { icon: Code, title: "Practice Code", color: "text-edu-accent" },
                    { icon: Users, title: "Study Groups", color: "text-edu-warning" }
                  ].map((action, index) => (
                    <Button 
                      key={action.title}
                      variant="outline" 
                      className="h-20 flex-col space-y-2 hover:shadow-glow transition-all duration-300"
                    >
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                      <span className="text-xs">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-edu-accent" />
                  <span>Upcoming</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-card/30 rounded-lg border border-border/30">
                    <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{event.date}</span>
                      <span className="text-xs text-primary font-medium">{event.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Progress */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-edu-success" />
                  <span>Study Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { subject: "JavaScript", progress: 85 },
                    { subject: "Data Structures", progress: 65 },
                    { subject: "React", progress: 40 }
                  ].map((subject, index) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{subject.subject}</span>
                        <span className="text-muted-foreground">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Chat */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-edu-secondary" />
                  <span>Quick Chat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-secondary hover:opacity-90">
                  Join Study Group Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}