import React from 'react';
import { Event } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onRegister?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const eventTypeColors = {
    workshop: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    meetup: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    webinar: 'bg-green-500/10 text-green-500 border-green-500/20',
    conference: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-base">
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-slow"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{event.title}</h3>
          <Badge className={eventTypeColors[event.type]}>
            {event.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          {event.featuredAlumni.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.featuredAlumni.join(', ')}</span>
            </div>
          )}
        </div>

        {event.registrationLink ? (
          <Button 
            className="w-full gap-2" 
            onClick={onRegister}
          >
            Register Now
            <ExternalLink className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="secondary" className="w-full" disabled>
            Registration Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;