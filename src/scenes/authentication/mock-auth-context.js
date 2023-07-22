// MockAuthContextProvider.js
import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const mockUser = {
    displayName: "John Doe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    major: "Computer Science",
    modules: ["CS2040S", "HSI1000"],
    teleName: "JohnDoe123",
    uid: "mockUserId123",
    year: "2023",
};

// Mock useAuth() hook for testing
export const useMockAuth = () => {
  return {
    currentUser: mockUser,
  };
};

export const MockAuthContextProvider = ({ children }) => {
  const mockAuth = useMockAuth();

  return (
    <AuthContext.Provider value={mockAuth}>{children}</AuthContext.Provider>
  );
};
