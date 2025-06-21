import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id?: string;
  name?: string;
  email?: string;
  // Add other user fields as needed
};

type AuthContextType = {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
  user: User;
  setUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User>({});

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
