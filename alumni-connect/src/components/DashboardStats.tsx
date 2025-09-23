import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { mockAlumni, mockEvents } from '@/data/mockData';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Alumni',
      value: mockAlumni.length.toString(),
      icon: GraduationCap,
      gradient: 'bg-gradient-primary',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Students',
      value: '1,234',
      icon: Users,
      gradient: 'bg-gradient-secondary',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'Upcoming Events',
      value: mockEvents.length.toString(),
      icon: Calendar,
      gradient: 'bg-gradient-accent',
      change: '2 this week',
      changeType: 'neutral' as const
    },
    {
      title: 'Mentorship Available',
      value: mockAlumni.filter(a => a.isAvailableForMentorship).length.toString(),
      icon: TrendingUp,
      gradient: 'bg-gradient-primary',
      change: '+25%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-base">
          <div className={`h-1 ${stat.gradient}`} />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.gradient} bg-opacity-10`}>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${
              stat.changeType === 'positive' ? 'text-success' : 
              'text-muted-foreground'
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;