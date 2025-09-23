export type UserRole = 'student' | 'alumni' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePic?: string;
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  batch: string;
  department: string;
  currentCompany: string;
  role: string;
  skills: string[];
  location: string;
  linkedIn?: string;
  experience: Experience[];
  achievements: Achievement[];
  projects: Project[];
  isAvailableForMentorship: boolean;
  isAvailableForReferral: boolean;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'meetup' | 'webinar' | 'conference';
  featuredAlumni: string[];
  image: string;
  registrationLink?: string;
}

export interface ReferralRequest {
  id: string;
  studentId: string;
  alumniId: string;
  company: string;
  position: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}