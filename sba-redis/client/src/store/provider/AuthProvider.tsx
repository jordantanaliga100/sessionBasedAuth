/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import API from "../../api/axios";
import type { User } from "../../types/User";
import {
  AuthContext,
  type LoginData,
  type RegisterData,
} from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✨ UPDATED: Login function accepts LoginData
  const login = async (userData: LoginData) => {
    setIsLoading(true);
    try {
      // Backend expects email/username and password
      const response = await API.post("/auth/sign-in", userData);
      console.log("res", response.data.data);

      // Backend returns full User object
      setUser(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✨ UPDATED: Register function accepts RegisterData
  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await API.post("/auth/sign-up", userData);
      setUser(response.data.data); // Automatic login
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await API.get("/auth/logout"); // 💡 Tawagin ang backend logout
      setUser(null);
    } catch (err: any) {
      console.error("Logout failed", err);
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/auth/me"); // 💡 Tatanungin ang backend kung may session
      setUser(response.data);
      setError(null);
    } catch (err: any) {
      console.log("No active session");
      setUser(null);
      // Hindi natin kailangan i-set ang error dito para hindi magulat ang user
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ error, user, isLoading, login, register, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
