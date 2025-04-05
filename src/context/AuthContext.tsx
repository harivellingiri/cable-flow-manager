
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'member' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isMember: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('cable_flow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This is a mock implementation
    // In a real app, you would call an API to validate credentials
    
    let mockUser: User;
    
    if (email.includes('admin')) {
      mockUser = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      };
    } else {
      mockUser = {
        id: '2',
        name: 'Member User',
        email: email,
        role: 'member'
      };
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(mockUser);
    localStorage.setItem('cable_flow_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cable_flow_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated,
        isAdmin,
        isMember
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
