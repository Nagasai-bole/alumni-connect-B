import React, { useState } from 'react';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [eventType, setEventType] = useState('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'meetup' as const,
  });

  const handleEventRegister = () => {
    const isSuccess = Math.random() > 0.2; // 80% success rate for demo
    
    if (isSuccess) {
      toast({
        title: "Registration Successful!",
        description: "You've been registered for the event. Check your email for confirmation.",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "This event is fully booked. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleAddEvent = () => {
    toast({
      title: "Event Created!",
      description: "Your event has been successfully added to the calendar.",
    });
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'meetup',
    });
  };

  const filteredEvents = eventType === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.type === eventType);

  const upcomingEvents = filteredEvents.filter(event => 
    new Date(event.date) >= new Date()
  );

  const pastEvents = filteredEvents.filter(event => 
    new Date(event.date) < new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              Alumni Events
            </h1>
            <p className="text-muted-foreground">
              Connect, learn, and grow with our alumni community events
            </p>
          </div>
          
          {user?.role === 'admin' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogDescription>
                    Add a new event to the alumni calendar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Describe the event"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Event location or virtual link"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Create Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Event Type Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <Button
            variant={eventType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEventType('all')}
          >
            All Events
          </Button>
          <Button
            variant={eventType === 'workshop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEventType('workshop')}
          >
            Workshops
          </Button>
          <Button
            variant={eventType === 'meetup' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEventType('meetup')}
          >
            Meetups
          </Button>
          <Button
            variant={eventType === 'webinar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEventType('webinar')}
          >
            Webinars
          </Button>
          <Button
            variant={eventType === 'conference' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEventType('conference')}
          >
            Conferences
          </Button>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming Events ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleEventRegister}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                <p className="text-muted-foreground">
                  Check back later for new events
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={handleEventRegister}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No past events</h3>
                <p className="text-muted-foreground">
                  Past events will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;