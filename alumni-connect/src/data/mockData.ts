import { Alumni, Event } from '@/types';

export const mockAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=1',
    batch: '2020',
    department: 'Computer Science',
    currentCompany: 'Google',
    role: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
    experience: [
      {
        company: 'Google',
        role: 'Senior Software Engineer',
        duration: '2022 - Present',
        description: 'Leading frontend development for Google Cloud Console'
      },
      {
        company: 'Microsoft',
        role: 'Software Engineer',
        duration: '2020 - 2022',
        description: 'Developed features for Microsoft Teams'
      }
    ],
    achievements: [
      {
        title: 'Best Project Award',
        description: 'Won best project award for AI-powered healthcare solution',
        year: '2020'
      },
      {
        title: 'Dean\'s List',
        description: 'Maintained 3.9+ GPA throughout college',
        year: '2019'
      }
    ],
    projects: [
      {
        title: 'AI Healthcare Assistant',
        description: 'Developed an AI-powered healthcare assistant for remote diagnosis',
        technologies: ['Python', 'TensorFlow', 'React'],
        link: 'https://github.com/sarahjohnson/ai-healthcare'
      }
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=3',
    batch: '2019',
    department: 'Data Science',
    currentCompany: 'Amazon',
    role: 'Data Scientist',
    location: 'Seattle, WA',
    linkedIn: 'https://linkedin.com/in/michaelchen',
    skills: ['Python', 'R', 'SQL', 'AWS', 'Machine Learning', 'Deep Learning'],
    experience: [
      {
        company: 'Amazon',
        role: 'Data Scientist',
        duration: '2021 - Present',
        description: 'Working on recommendation systems for Amazon Prime'
      },
      {
        company: 'Facebook',
        role: 'Data Analyst',
        duration: '2019 - 2021',
        description: 'Analyzed user engagement metrics'
      }
    ],
    achievements: [
      {
        title: 'Published Research Paper',
        description: 'Published paper on neural networks in IEEE conference',
        year: '2019'
      }
    ],
    projects: [
      {
        title: 'Stock Price Predictor',
        description: 'ML model for predicting stock prices using LSTM networks',
        technologies: ['Python', 'TensorFlow', 'Pandas'],
        link: 'https://github.com/michaelchen/stock-predictor'
      }
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: false
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=5',
    batch: '2021',
    department: 'Computer Science',
    currentCompany: 'Meta',
    role: 'Product Manager',
    location: 'Menlo Park, CA',
    linkedIn: 'https://linkedin.com/in/emilyrodriguez',
    skills: ['Product Management', 'Agile', 'UX Design', 'Data Analysis', 'Leadership'],
    experience: [
      {
        company: 'Meta',
        role: 'Product Manager',
        duration: '2021 - Present',
        description: 'Leading Instagram Stories product team'
      }
    ],
    achievements: [
      {
        title: 'Student Body President',
        description: 'Led student government initiatives',
        year: '2020'
      }
    ],
    projects: [
      {
        title: 'Campus Connect App',
        description: 'Mobile app for connecting students and organizing events',
        technologies: ['React Native', 'Firebase', 'Node.js']
      }
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: true
  },
  {
    id: '4',
    name: 'David Kumar',
    email: 'david.kumar@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=8',
    batch: '2018',
    department: 'Electrical Engineering',
    currentCompany: 'Tesla',
    role: 'Senior Hardware Engineer',
    location: 'Palo Alto, CA',
    linkedIn: 'https://linkedin.com/in/davidkumar',
    skills: ['Circuit Design', 'Embedded Systems', 'C++', 'MATLAB', 'AutoCAD'],
    experience: [
      {
        company: 'Tesla',
        role: 'Senior Hardware Engineer',
        duration: '2020 - Present',
        description: 'Designing battery management systems for Model 3'
      },
      {
        company: 'Intel',
        role: 'Hardware Engineer',
        duration: '2018 - 2020',
        description: 'Worked on processor architecture design'
      }
    ],
    achievements: [
      {
        title: 'Patent Holder',
        description: 'Holds 3 patents in battery optimization',
        year: '2022'
      }
    ],
    projects: [
      {
        title: 'Smart Grid System',
        description: 'IoT-based smart grid management system',
        technologies: ['Arduino', 'Python', 'AWS IoT']
      }
    ],
    isAvailableForMentorship: false,
    isAvailableForReferral: true
  },
  {
    id: '5',
    name: 'Jessica Taylor',
    email: 'jessica.taylor@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=9',
    batch: '2022',
    department: 'Business Administration',
    currentCompany: 'McKinsey & Company',
    role: 'Business Analyst',
    location: 'New York, NY',
    linkedIn: 'https://linkedin.com/in/jessicataylor',
    skills: ['Strategy', 'Financial Analysis', 'PowerBI', 'Excel', 'Presentation'],
    experience: [
      {
        company: 'McKinsey & Company',
        role: 'Business Analyst',
        duration: '2022 - Present',
        description: 'Consulting for Fortune 500 companies on digital transformation'
      }
    ],
    achievements: [
      {
        title: 'Valedictorian',
        description: 'Graduated as class valedictorian',
        year: '2022'
      }
    ],
    projects: [
      {
        title: 'Startup Incubator',
        description: 'Founded campus startup incubator program',
        technologies: ['Business Strategy', 'Marketing']
      }
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: false
  },
  {
    id: '6',
    name: 'Robert Williams',
    email: 'robert.williams@email.com',
    profilePic: 'https://i.pravatar.cc/150?img=11',
    batch: '2017',
    department: 'Mechanical Engineering',
    currentCompany: 'SpaceX',
    role: 'Propulsion Engineer',
    location: 'Hawthorne, CA',
    linkedIn: 'https://linkedin.com/in/robertwilliams',
    skills: ['CAD', 'Fluid Dynamics', 'Python', 'ANSYS', 'SolidWorks'],
    experience: [
      {
        company: 'SpaceX',
        role: 'Propulsion Engineer',
        duration: '2019 - Present',
        description: 'Working on Raptor engine development'
      },
      {
        company: 'Boeing',
        role: 'Aerospace Engineer',
        duration: '2017 - 2019',
        description: 'Designed components for commercial aircraft'
      }
    ],
    achievements: [
      {
        title: 'NASA Competition Winner',
        description: 'Won NASA Mars Rover design competition',
        year: '2017'
      }
    ],
    projects: [
      {
        title: 'Rocket Engine Simulator',
        description: 'Developed simulation software for rocket engines',
        technologies: ['Python', 'MATLAB', 'C++']
      }
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Talk: AI and the Future of Software Development',
    description: 'Join Sarah Johnson from Google as she discusses the impact of AI on modern software development practices.',
    date: '2024-02-15',
    time: '6:00 PM',
    location: 'Virtual - Zoom',
    type: 'webinar',
    featuredAlumni: ['Sarah Johnson'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    registrationLink: 'https://example.com/register'
  },
  {
    id: '2',
    title: 'Alumni Networking Meetup',
    description: 'Annual alumni networking event to connect current students with successful graduates.',
    date: '2024-03-01',
    time: '5:00 PM',
    location: 'Campus Auditorium',
    type: 'meetup',
    featuredAlumni: ['Michael Chen', 'Emily Rodriguez', 'Jessica Taylor'],
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    registrationLink: 'https://example.com/register'
  },
  {
    id: '3',
    title: 'Product Management Workshop',
    description: 'Emily Rodriguez from Meta shares insights on breaking into product management.',
    date: '2024-02-28',
    time: '4:00 PM',
    location: 'Room 301, Engineering Building',
    type: 'workshop',
    featuredAlumni: ['Emily Rodriguez'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800'
  },
  {
    id: '4',
    title: 'Career Fair 2024',
    description: 'Connect with top companies and explore career opportunities with alumni recruiters.',
    date: '2024-04-10',
    time: '10:00 AM',
    location: 'Sports Complex',
    type: 'conference',
    featuredAlumni: ['David Kumar', 'Robert Williams'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    registrationLink: 'https://example.com/register'
  }
];

export const departments = [
  'Computer Science',
  'Data Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Civil Engineering',
  'Chemical Engineering'
];

export const companies = [
  'Google',
  'Amazon',
  'Meta',
  'Microsoft',
  'Apple',
  'Tesla',
  'SpaceX',
  'McKinsey & Company',
  'Intel',
  'Boeing'
];

export const batches = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];

export const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Machine Learning',
  'Data Analysis',
  'Product Management',
  'UX Design',
  'AWS',
  'SQL',
  'Leadership',
  'Agile'
];