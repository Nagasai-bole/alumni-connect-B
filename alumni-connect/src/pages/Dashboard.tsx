import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardStats from "@/components/DashboardStats";
import AlumniCard from "@/components/AlumniCard";
import { mockAlumni, mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, UserPlus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface RequestsData {
  referralRequests: { message: string }[];
  mentorshipRequests: { message: string }[];
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [requests, setRequests] = useState<RequestsData>({
    referralRequests: [],
    mentorshipRequests: [],
  });

  const featuredAlumni = mockAlumni.slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 2);

  // Fetch alumni requests if user is alumni
  useEffect(() => {
    const fetchRequests = async () => {
      if (user?.role !== "alumni") return;

      try {
        const res = await fetch(
          "http://localhost:3000/api/alumni/me/requests",
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests({
          referralRequests: data.referralRequests || [],
          mentorshipRequests: data.mentorshipRequests || [],
        });
      } catch (err: any) {
        toast({ title: "Error", description: err.message });
      }
    };

    fetchRequests();
  }, [user, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  Welcome back, {user?.name}!
                  <Sparkles className="h-6 w-6 text-accent" />
                </h1>
                <p className="text-primary-foreground/80">
                  {user?.role === "student" &&
                    "Connect with alumni and explore opportunities"}
                  {user?.role === "alumni" &&
                    "Stay connected with your alma mater"}
                  {user?.role === "admin" &&
                    "Manage the alumni network effectively"}
                </p>
              </div>
              {user?.role === "student" && (
                <Link to="/alumni">
                  <Button className="bg-accent hover:bg-accent-hover text-accent-foreground gap-2">
                    <UserPlus className="h-4 w-4" />
                    Find Alumni
                  </Button>
                </Link>
              )}
              {user?.role === "admin" && (
                <Link to="/events">
                  <Button className="bg-accent hover:bg-accent-hover text-accent-foreground gap-2">
                    <Calendar className="h-4 w-4" />
                    Manage Events
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <DashboardStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Featured Alumni Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Featured Alumni</CardTitle>
                <Link to="/alumni">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {featuredAlumni.map((alumni) => (
                    <AlumniCard key={alumni.id} alumni={alumni} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {user?.role === "student" && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/alumni" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Browse Alumni Directory
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    Request Mentorship
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    View Referral Opportunities
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <Link to="/events">
                  <Button variant="ghost" size="sm" className="gap-1">
                    All Events
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-l-4 border-primary pl-4"
                  >
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {event.time}
                    </p>
                    <Link to="/events">
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 h-auto mt-2"
                      >
                        Learn More →
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Role-specific Stats */}
            {user?.role === "alumni" && (
              <>
                {/* Your Impact */}
                <Card className="shadow-lg bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Mentorship Requests
                        </span>
                        <span className="font-semibold">
                          {requests.mentorshipRequests.length} pending
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Referral Requests
                        </span>
                        <span className="font-semibold">
                          {requests.referralRequests.length} new
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Profile Views
                        </span>
                        <span className="font-semibold">127 this month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Messages Section */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Messages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Referral Requests */}
                    <div>
                      <h3 className="text-md font-semibold mb-2">
                        Referral Requests
                      </h3>
                      {requests.referralRequests.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No referral requests
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {requests.referralRequests.map((req, idx) => (
                            <li
                              key={idx}
                              className="p-3 border rounded-md flex flex-col gap-1"
                            >
                              <span className="text-sm text-muted-foreground">
                                {req.message}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Mentorship Requests */}
                    <div>
                      <h3 className="text-md font-semibold mb-2">
                        Mentorship Requests
                      </h3>
                      {requests.mentorshipRequests.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No mentorship requests
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {requests.mentorshipRequests.map((req, idx) => (
                            <li
                              key={idx}
                              className="p-3 border rounded-md flex flex-col gap-1"
                            >
                              <span className="text-sm text-muted-foreground">
                                {req.message}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
