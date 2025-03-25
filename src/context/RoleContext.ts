"use client"
import { AppAbility } from '@/lib/ability';
import { createContext, useContext } from 'react';
type User = {
  name: string;
  role: string;
} | null;
// Define the shape of the context value
interface AuthContextType {
  user: User;
  ability: AppAbility;
  changeRole: (role: string) => void;
  
}

// Create the context with the proper type
export const ThemeContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context safely
export const useRole = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


