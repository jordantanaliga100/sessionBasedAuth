/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { Role, type User } from "../types/User";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // state
  const [user, setUser] = useState<User | null>(null);

  //  {
  //   id: "123",
  //   username: "TestUser",
  //   email: "test@example.com",
  //   role: Role.User,
  // }
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  // Function to check auth on mount
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // const response = await api.get("/auth/me"); // Tawagin ang backend
      // setUser(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({
        id: "123",
        username: "TestUser",
        email: "test@example.com",
        role: Role.User,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      setUser(null); // Not authenticated
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkAuth(); // Check when app loads
    }, 1000);
  }, []);

  const logout = () => {
    setUser(null);
    // Dito rin natin tatawagin ang api.post("/auth/logout") mamaya
  };
  return (
    <AuthContext.Provider
      value={{ error, user, isLoading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
