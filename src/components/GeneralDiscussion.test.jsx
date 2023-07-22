import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import GeneralDiscussion from "./GeneralDiscussion";

test("GeneralDiscussion render without error", async () => {
    // ARRANGE
    render(<GeneralDiscussion moduleCode={"HSI1000"}/>);
});

test("GeneralDiscussion render with correct moduleCode", async () => {
    // ARRANGE
    render(<GeneralDiscussion moduleCode={"HSI1000"}/>);

    // ASSERT
    expect(screen.getByTestId("general-discussion-title")).toHaveTextContent("HSI1000 General Discussion");
});

// test("GeneralDiscussion render without error", async () => {
//     // ARRANGE
//     render(<Fetch url="/greeting" />);

//     // ACT
//     await userEvent.click(screen.getByText("Load Greeting"));
//     await screen.findByRole("heading");

//     // ASSERT
//     expect(screen.getByRole("heading")).toHaveTextContent("hello there");
//     expect(screen.getByRole("button")).toBeDisabled();
// });
