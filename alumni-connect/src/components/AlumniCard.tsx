import React from "react";
import { Link } from "react-router-dom";
import { Alumni } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Calendar, Star } from "lucide-react";

interface AlumniCardProps {
  alumni: Alumni;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
  console.log("Alumni ID:", alumni.id); // <-- Add this line
  return (
    <Card className="group hover:shadow-xl transition-all duration-base transform hover:-translate-y-1 overflow-hidden">
      <div className="h-2 bg-gradient-primary" />
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={alumni.profilePic}
            alt={alumni.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/10"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">
              {alumni.name}
            </h3>
            <p className="text-sm text-primary font-medium">{alumni.role}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Briefcase className="h-3 w-3" />
              {alumni.currentCompany}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Batch {alumni.batch}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {alumni.department}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            {alumni.location}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {alumni.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
              >
                {skill}
              </span>
            ))}
            {alumni.skills.length > 3 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{alumni.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {alumni.isAvailableForMentorship && (
            <Badge className="bg-success/10 text-success border-success/20 text-xs">
              <Star className="h-3 w-3 mr-1" />
              Mentorship
            </Badge>
          )}
          {alumni.isAvailableForReferral && (
            <Badge className="bg-info/10 text-info border-info/20 text-xs">
              Referrals
            </Badge>
          )}
        </div>

        <Link to={`/alumni/${alumni.id}`}>
          <Button className="w-full mt-4" variant="outline">
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AlumniCard;
