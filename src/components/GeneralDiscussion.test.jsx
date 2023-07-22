import React, { createContext, useContext} from 'react'
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GeneralDiscussion from "./GeneralDiscussion";
//import essential firebase user authentication modules
import { useAuth } from "../scenes/authentication/auth-context";
import { MockAuthContextProvider } from "../scenes/authentication/mock-auth-context";
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

//IMPORTANT
// Mock the useAuth() hook
jest.mock("../scenes/authentication/auth-context", () => ({
    useAuth: () => ({
      currentUser: mockUser,
    }),
  }));

// //useAuth to get the current user
const { currentUser } = mockUser;

test("GeneralDiscussion render without error", async () => {
    // ARRANGE
    render(
        <GeneralDiscussion moduleCode={"HSI1000"} />
    );
});

test("GeneralDiscussion render with correct moduleCode", async () => {
    // ARRANGE
    render(<GeneralDiscussion moduleCode={"HSI1000"}/>);

    // ASSERT
    expect(screen.getByTestId("general-discussion-title")).toHaveTextContent("HSI1000 General Discussion");
});


test("GeneralDiscussion render with different moduleCode(should expect not the same context)", async () => {
    // ARRANGE
    render(<GeneralDiscussion moduleCode={"CS2040S"}/>);

    // ASSERT
    expect(screen.getByTestId("general-discussion-title")).not.toHaveTextContent("HSI1000 General Discussion");
});
