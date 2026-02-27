import { createContext } from "react";
import { type User } from "../../types/User";

export interface RegisterData {
  username: string;
  email: string; // ✨ Idagdag 'to
  password: string;
}

// ✨ LOGIN: Kadalasan username/email at password lang
export interface LoginData {
  email: string; // O kaya email depende sa backend mo
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  register: (userData: RegisterData) => Promise<void>;
  login: (userData: LoginData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
