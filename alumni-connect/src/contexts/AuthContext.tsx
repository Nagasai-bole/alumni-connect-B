import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'John Student', email: 'student@university.edu', role: 'student' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', role: 'alumni' },
  { id: '3', name: 'Admin User', email: 'admin@university.edu', role: 'admin' }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUsers[0]); // Default to student role

  const switchRole = (role: UserRole) => {
    const newUser = mockUsers.find(u => u.role === role);
    if (newUser) {
      setUser(newUser);
    }
  };

  const value = {
    user,
    setUser,
    switchRole,
    isLoggedIn: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};