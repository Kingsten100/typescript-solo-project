import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  username: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  users: User[];
  createUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_USERS_KEY = "users";
const STORAGE_CURRENT_USER_KEY = "currentUser";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Hämta alla registrerade användare
  const [users, setUsers] = useState<User[]>(() => {
    const stored = localStorage.getItem(STORAGE_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Hämta aktuell inloggad användare
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  // Spara användare när de ändras
  useEffect(() => {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }, [users]);

  // Spara aktuell användare
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // Skapa ny användare
  const createUser = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  // Logga in
  const login = (username: string, password: string): boolean => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logga ut
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, users, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook för att använda contexten
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth måste användas inom AuthProvider");
  }
  return context;
};
