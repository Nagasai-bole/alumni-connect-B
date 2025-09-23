import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Linkedin,
  Star,
  Users,
  Award,
  Code,
  ArrowLeft,
  Send,
  UserPlus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Define the Alumni type
interface Alumni {
  id: string;
  name: string;
  role: string;
  currentCompany: string;
  profilePic: string;
  batch: string;
  department: string;
  location: string;
  email: string;
  linkedIn?: string;
  skills: string[];
  experience?: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  achievements?: { title: string; description: string; year: string }[];
  isAvailableForMentorship: boolean;
  isAvailableForReferral: boolean;
}

const AlumniProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();

  const [alumni, setAlumni] = useState<Alumni | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [referralMessage, setReferralMessage] = useState("");
  const [mentorshipMessage, setMentorshipMessage] = useState("");

  // Fetch alumni data
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/alumni/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          setError(
            res.status === 404 ? "Alumni not found" : "Something went wrong"
          );
          return;
        }
        const data = await res.json();
        setAlumni({ ...data, id: data._id }); // map _id to id
      } catch (err) {
        setError("Failed to load alumni data");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [id]);

  // Handle referral request
  const handleReferralRequest = async () => {
    if (!referralMessage) return toast({ title: "Message cannot be empty" });

    try {
      const res = await fetch(
        `http://localhost:3000/api/alumni/${id}/referral`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: referralMessage }),
        }
      );
      if (!res.ok) throw new Error("Failed to send referral request");

      toast({
        title: "Referral Request Sent!",
        description: `Your request has been sent to ${alumni?.name}.`,
      });
      setReferralMessage("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    }
  };

  // Handle mentorship request
  const handleMentorshipRequest = async () => {
    if (!mentorshipMessage) return toast({ title: "Message cannot be empty" });

    try {
      const res = await fetch(
        `http://localhost:3000/api/alumni/${id}/mentorship`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message: mentorshipMessage }),
        }
      );
      if (!res.ok) throw new Error("Failed to send mentorship request");

      toast({
        title: "Mentorship Request Sent!",
        description: `Your request has been sent to ${alumni?.name}.`,
      });
      setMentorshipMessage("");
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (error || !alumni)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            {error || "Alumni not found"}
          </h2>
          <Link to="/alumni">
            <Button>Back to Directory</Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/alumni">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 bg-gradient-hero" />
          <CardContent className="relative pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <img
                src={alumni.profilePic}
                alt={alumni.name}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
              <div className="flex-1 pt-4">
                <h1 className="text-3xl font-bold mb-2">{alumni.name}</h1>
                <p className="text-xl text-primary mb-2">{alumni.role}</p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {alumni.currentCompany}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {alumni.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Batch {alumni.batch}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {alumni.isAvailableForMentorship && (
                    <Badge className="bg-success/10 text-success border-success/20">
                      <Star className="h-3 w-3 mr-1" />
                      Available for Mentorship
                    </Badge>
                  )}
                  {alumni.isAvailableForReferral && (
                    <Badge className="bg-info/10 text-info border-info/20">
                      <Users className="h-3 w-3 mr-1" />
                      Open to Referrals
                    </Badge>
                  )}
                  <Badge variant="secondary">{alumni.department}</Badge>
                </div>

                {user?.role === "student" && (
                  <div className="flex flex-wrap gap-2">
                    {/* Referral */}
                    {alumni.isAvailableForReferral && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Send className="h-4 w-4" />
                            Request Referral
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Request Referral from {alumni.name}
                            </DialogTitle>
                            <DialogDescription>
                              Send a referral request for opportunities at{" "}
                              {alumni.currentCompany}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Write a brief message..."
                              value={referralMessage}
                              onChange={(e) =>
                                setReferralMessage(e.target.value)
                              }
                              rows={4}
                            />
                            <Button
                              onClick={handleReferralRequest}
                              className="w-full"
                            >
                              Send Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {/* Mentorship */}
                    {alumni.isAvailableForMentorship && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" className="gap-2">
                            <UserPlus className="h-4 w-4" />
                            Request Mentorship
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Request Mentorship from {alumni.name}
                            </DialogTitle>
                            <DialogDescription>
                              Connect with {alumni.name} for career guidance
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              placeholder="Introduce yourself..."
                              value={mentorshipMessage}
                              onChange={(e) =>
                                setMentorshipMessage(e.target.value)
                              }
                              rows={4}
                            />
                            <Button
                              onClick={handleMentorshipRequest}
                              className="w-full"
                            >
                              Send Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {alumni.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{alumni.email}</span>
                </div>
                {alumni.linkedIn && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={alumni.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience" className="space-y-4">
            {alumni.experience?.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{exp.role}</CardTitle>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <Badge variant="outline">{exp.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects" className="space-y-4">
            {alumni.projects?.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="link" size="sm" className="px-0">
                        View Project →
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-4">
            {alumni.achievements?.map((ach, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-accent mt-1" />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{ach.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ach.description}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {ach.year}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlumniProfile;
